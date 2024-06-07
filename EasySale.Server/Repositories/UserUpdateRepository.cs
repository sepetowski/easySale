using EasySale.Server.Data;
using EasySale.Server.Interfaces;
using EasySale.Server.Models.DTO.UserUpdates;
using Microsoft.EntityFrameworkCore;


namespace EasySale.Server.Repositories
{
    public class UserUpdateRepository : IUserUpdateRepository
    {

        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _contextAccessor;
      
        public UserUpdateRepository(DataContext context, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor )
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _contextAccessor = httpContextAccessor;
           
        }


        public async Task<UpdateUserDetailsResponseDTO> UpdateUserDetailsAsync(UpdateUserDetailsRequestDTO requestDTO)
        {
            var parsed = Guid.TryParse(requestDTO.Id, out var id);

            if (!parsed)
                throw new Exception("User not found");

            var userExist = await _context.Users.FirstOrDefaultAsync((user) => user.Id == id);

            if (userExist == null)
                throw new Exception("User not found");

            var usernameExist = await _context.Users.FirstOrDefaultAsync((user) => user.Username == requestDTO.Username);

            if (usernameExist !=null)
                throw new Exception("This username is taken");


            userExist.FirstName=requestDTO.FirstName;
            userExist.LastName=requestDTO.LastName;
           userExist.Username=requestDTO.Username;

            await _context.SaveChangesAsync();

            var updatedUser = new UpdateUserDetailsResponseDTO() 
            {   Username = userExist.Username,
                FirstName=userExist.FirstName,
                LastName=userExist.LastName 
            };   

            return updatedUser;
          

        }

        public async Task<UpdateProfileImageResponseDTO>  UpdateProfileImageAsync(UpdateProfileImageRequestDTO request)
        {
            var parsed = Guid.TryParse(request.UserId, out var id);

            if (!parsed)
                throw new Exception("User not found");

            var userExist = await _context.Users.FirstOrDefaultAsync((user) => user.Id == id);

            if (userExist == null)
                throw new Exception("User not found");  
                
            string isNotValidInfo= ValidateFileUpload(request);
            if (isNotValidInfo.Length > 0)
                throw new Exception(isNotValidInfo);

            string fileExtension = Path.GetExtension(request.ImageFile.FileName).ToLower();

            
            string userDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", "UsersProfiles");
            string localPath = Path.Combine(userDirectory, $"{id}{fileExtension}");

            if (!Directory.Exists(userDirectory))
            {
                Directory.CreateDirectory(userDirectory);
            }

            var deleted= DeleteProfileImage(id);

            if(!deleted)
                throw new Exception("Can not delete old image. Please try again");

            using var stream = new FileStream(localPath, FileMode.Create, FileAccess.Write);
            await request.ImageFile.CopyToAsync(stream);

            var contextRequest = _contextAccessor.HttpContext.Request;
            var urlFilePath = $"{contextRequest.Scheme}://{contextRequest.Host}/Images/UsersProfiles/{id}{fileExtension}";

            userExist.ProfileImagePath = urlFilePath;

            await _context.SaveChangesAsync();

            return new UpdateProfileImageResponseDTO() { ProfileImageUrl = urlFilePath };
        }

        public async Task<DeleteProfileImageResponseDTO> DeleteProfileImageAsync(DeleteProfileImageRequestDTO deleteProfileImageRequestDTO)
        {


            var parsed=Guid.TryParse(deleteProfileImageRequestDTO.UserId, out var id);

            if(!parsed)
                return new DeleteProfileImageResponseDTO { Success = false, Message = "User not found" };

            var userExist = await _context.Users.FirstOrDefaultAsync((user) => user.Id == id);

            if (userExist == null)
                return new DeleteProfileImageResponseDTO { Success = false, Message="User not found" };

            if (userExist.ProfileImagePath == null)
                return new DeleteProfileImageResponseDTO { Success = false ,Message="No image to delete" };

            var deleted=DeleteProfileImage(id);

            if(!deleted) 
                return new DeleteProfileImageResponseDTO { Success = false , Message= "Can not delete old image. Please try again" };

            userExist.ProfileImagePath = null;
            await _context.SaveChangesAsync();

            return new DeleteProfileImageResponseDTO { Success=true , Message="Image has been deleted"};
        }


        private bool DeleteProfileImage(Guid id)
        {

            string userDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", "UsersProfiles");

            var existingFiles = Directory.GetFiles(userDirectory, $"{id}.*");
            foreach (var file in existingFiles)
            {
                File.Delete(file);
            }

            var leftFiles = Directory.GetFiles(userDirectory, $"{id}.*");
            if (leftFiles.Length == 0)
                return true;

            return false;
        }

        private string ValidateFileUpload(UpdateProfileImageRequestDTO request)
        {
            string[] allowedExtensions = [".jpg", ".jpeg", ".png"];
            int maxFileSize = 10485760; //10MB

            if (!allowedExtensions.Contains(Path.GetExtension(request.ImageFile.FileName)))
                return "Unsupported file extensiom";

            if (request.ImageFile.Length > maxFileSize)
                return "File size more than 10MB. Plase upload a smaller image";

            return "";
        }

      
    }


    
}

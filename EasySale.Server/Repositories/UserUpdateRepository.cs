using EasySale.Server.Data;
using EasySale.Server.Interfaces;
using EasySale.Server.Models.DTO.UserUpdates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;


namespace EasySale.Server.Repositories
{
    public class UserUpdateRepository : IUserUpdateRepository
    {

        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _contextAccessor;
        public UserUpdateRepository(DataContext context, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor   )
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _contextAccessor = httpContextAccessor;
        }

        public async Task<UpdateProfileImageResponseDTO>  UpdateProfileImageAsync(UpdateProfileImageRequestDTO request)
        {
            var id = new Guid(request.UserId);
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

            var existingFiles = Directory.GetFiles(userDirectory, $"{id}.*");
            foreach (var file in existingFiles)
            {
                File.Delete(file);
            }

            using var stream = new FileStream(localPath, FileMode.Create, FileAccess.Write);
            await request.ImageFile.CopyToAsync(stream);

            var contextRequest = _contextAccessor.HttpContext.Request;
            var urlFilePath = $"{contextRequest.Scheme}://{contextRequest.Host}/Images/UsersProfiles/{id}{fileExtension}";

            userExist.ProfileImagePath = urlFilePath;

            await _context.SaveChangesAsync();

            return new UpdateProfileImageResponseDTO() { ImageFile = urlFilePath };
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

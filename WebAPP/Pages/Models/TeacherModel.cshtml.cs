using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using WebAPP.Services;

namespace WebAPP.Pages
{
    [Authorize] // Esto restringirá el acceso solo a usuarios autenticados
    public class OnlyTeachersModel : PageModel
    {
        // Inyecta servicios adicionales si es necesario
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMyDataService _myDataService;

        // Asegúrate de que tu constructor reciba las instancias de los servicios necesarios
        public OnlyTeachersModel(UserManager<IdentityUser> userManager, IMyDataService myDataService)
        {
            _userManager = userManager;
            _myDataService = myDataService;
        }

        public string WelcomeMessage { get; set; }

        public async Task OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                WelcomeMessage = $"Bienvenido, {user.UserName}!";
            }

            var data = _myDataService.GetDataForTeacher(user.Id);

        }
    }
}

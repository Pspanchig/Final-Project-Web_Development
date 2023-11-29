using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace WebAPP.Pages
{
    [AllowAnonymous] // Esto permite que los usuarios no autenticados vean la página de inicio de sesión
    public class Page1hModel : PageModel
    {
        private readonly SignInManager<IdentityUser> _signInManager;

        public Page1hModel(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            public string Username { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            public bool LoginAsOption1 { get; set; }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                // Lógica para iniciar sesión utilizando ASP.NET Core Identity
                var result = await _signInManager.PasswordSignInAsync(Input.Username, Input.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    // Redirigir a la página correspondiente
                    return RedirectToPage(Input.LoginAsOption1 ? "Page4" : "Page3");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Inicio de sesión inválido.");
                }
            }

            return Page();
        }
    }
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAuthentication("MyCookieAuth").AddCookie("MyCookieAuth", options =>
{
    options.Cookie.Name = "MyCookie";
    options.LoginPath = "/login";
    options.AccessDeniedPath = "/denied";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// [HttpPost]
// [Route("Account/Register")]
// public IActionResult Register(UserModel model)
// {
//     if (ModelState.IsValid)
//     {
//         // Hash the password
//         var hashedPassword = HashPassword(model.Password);
        
//         // Save the username and hashed password to the database
//         SaveUser(model.Username, hashedPassword);
        
//         // Redirect or return a success message
//         return RedirectToAction("Success");
//     }
    
//     // If model state is not valid, return to the form with validation messages
//     return View(model);
// }

// private string HashPassword(string password)
// {
//     // Use a secure password hashing method here
// }

// private void SaveUser(string username, string hashedPassword)
// {
//     // Use Entity Framework or another method to save the user to the database
// }

// public class UserModel
// {
//     [Required]
//     public string Username { get; set; }
    
//     [Required]
//     [DataType(DataType.Password)]
//     public string Password { get; set; }
// }

// public void ConfigureServices(IServiceCollection services)
// {
//     services.AddDbContext<ApplicationDbContext>(options =>
//         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    
//     services.AddControllersWithViews();
    
//     // Other service configurations...
// }

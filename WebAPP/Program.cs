using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPP.Data;
using WebAPP.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

// Configure the application cookie settings once here
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/ED_SUPPORT/Page1h"; // Use your custom login page path here
    options.AccessDeniedPath = "/Account/AccessDenied"; // Use the default access denied path or change as needed
});

builder.Services.AddScoped<IMyDataService, MyDataService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages(); // No need to call UseEndpoints again as MapRazorPages is sufficient for Razor Pages

app.Run();

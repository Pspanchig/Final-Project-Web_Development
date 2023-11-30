using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();
app.UseCors( x=> x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

string filepath = "./users.json";

string readusers = File.ReadAllText(filepath);
List<User> users = JsonSerializer.Deserialize<List<User>>(readusers);


app.MapGet("/", () => "Hello World!");
app.MapPost("/NewUser", (User user) => {
    users!.Add(user);
    string json = JsonSerializer.Serialize(users);
    File.WriteAllText(filepath, json);
});

app.MapGet("/OtherPath", () => users);
app.Run();


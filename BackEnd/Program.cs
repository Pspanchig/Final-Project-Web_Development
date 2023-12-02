using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
var app = builder.Build();
app.UseCors( x=> x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

List<User> users = new();
string filepath = "users.json";

if(File.Exists(filepath)){
    string readusers = File.ReadAllText(filepath);
        try {
        users = JsonSerializer.Deserialize<List<User>>(readusers) ?? new List<User>();
    } catch (JsonException ex) {
        // Handle or log the error appropriately
        Console.WriteLine($"JSON format error: {ex.Message}");
    }
}

app.MapGet("/", () => "World!");
app.MapGet("/UserInfo", () => users);
app.MapPost("/NewUser", (User user) => {
    users!.Add(user);
    string json = JsonSerializer.Serialize(users);
    File.WriteAllText(filepath, json);
});
////////////////////////////////////////////////////////////////////
string filepath1 = "Class.json";
List<Course> classes = new();

if(File.Exists(filepath1)){
    string readusers1 = File.ReadAllText(filepath1);
    classes.AddRange(JsonSerializer.Deserialize<List<Course>>(readusers1));
}

app.MapGet("/ClassInfo", () => classes);
app.MapPost("/NewClass", (Course clas) => {
    classes!.Add(clas);
    string json1 = JsonSerializer.Serialize(classes);
    File.WriteAllText(filepath1, json1);
});
////////////////////////////////////////////////////////////////////
string filepath2 = "Todo.json";
List<TODO> TODOs = new();

if(File.Exists(filepath2)){
    string readusers2 = File.ReadAllText(filepath2);
    TODOs.AddRange(JsonSerializer.Deserialize<List<TODO>>(readusers2));
}

app.MapGet("/TasksInfo", () => TODOs);
app.MapPost("/NewTask", (TODO Todo) => {
    TODOs!.Add(Todo);
    string json2 = JsonSerializer.Serialize(TODOs);
    File.WriteAllText(filepath2, json2);
});

app.Run();

public record User(string Name, string Password, bool IsProffesor);
public record Course(string Title, int Number, string info, string Owner);
public record TODO(string Title, string Info, string Owner, int ID);
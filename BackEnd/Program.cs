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
string todoPaht = "Todo.json";
List<TODO> TODOs = new();

if(File.Exists(todoPaht)){
    string readusers2 = File.ReadAllText(todoPaht);
    TODOs.AddRange(JsonSerializer.Deserialize<List<TODO>>(readusers2));
}

app.MapGet("/TasksInfo", () => TODOs);
app.MapGet("/TasksInfo/{taskId}", (int taskId) => {
    var task = TODOs.FirstOrDefault(t => t.ID == taskId);
    return task is not null ? Results.Json(task) : Results.NotFound("Task not found");
});
app.MapDelete("/TasksInfo/{taskId}", (int taskId) => {
    TODOs.RemoveAt(taskId);
    string json = JsonSerializer.Serialize(TODOs);
    File.WriteAllText(todoPaht, json);
});

app.MapPost("/NewTask", (TODO Todo) => {
    TODOs!.Add(Todo);
    string json2 = JsonSerializer.Serialize(TODOs);
    File.WriteAllText(todoPaht, json2);
});
////////////////////////////////////////////////////////////////////
string filepath3 = "groups.json";
List<Group> groups = new();

if(File.Exists(filepath3)){
    string readusers1 = File.ReadAllText(filepath3);
    groups.AddRange(JsonSerializer.Deserialize<List<Group>>(readusers1));
}

app.MapGet("/GroupInfo", () => groups);
app.MapPost("/NewGroup", (Group group) => {
    groups!.Add(group);
    string json3 = JsonSerializer.Serialize(groups);
    File.WriteAllText(filepath3, json3);
});
////////////////////////////////////////////////////////////////////
string ChatsPath = "Chat.json";
List<Chat> Chats = new();

if(File.Exists(ChatsPath)){
    string readusers2 = File.ReadAllText(ChatsPath);
    Chats.AddRange(JsonSerializer.Deserialize<List<Chat>>(readusers2));
}

app.MapGet("/ChatInfo", () => Chats);
app.MapGet("/ChatInfo/{ChatId}", (int ChatId) => {
    var chat = Chats.FirstOrDefault(t => t.ID == ChatId);
    return chat is not null ? Results.Json(chat) : Results.NotFound("Chat not found");
});
app.MapDelete("/ChatInfo/{ChatId}", (int ChatId) => {
    Chats.RemoveAt(ChatId);
    string json = JsonSerializer.Serialize(Chats);
    File.WriteAllText(ChatsPath, json);
});

app.MapPost("/NewChat", (Chat chat) => {
    Chats!.Add(chat);
    string json2 = JsonSerializer.Serialize(Chats);
    File.WriteAllText(ChatsPath, json2);
});

app.Run();

public record Chat(string User, string Text, bool IsProffesor, int ID);
public record User(string Name, string Password, bool IsProffesor);
public record Course(string Title, int Number, string info, string Owner);
public record TODO(string CourseName, string Title, string Info, string Owner, int ID);
public record Group(string Title, string Class, string[] Students, string Info, string owner);
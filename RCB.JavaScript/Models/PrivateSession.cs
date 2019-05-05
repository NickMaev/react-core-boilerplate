namespace RCB.JavaScript.Models
{
    /// <summary>
    /// Represents private session data that
    /// can only be used by NodeServices.
    /// This data is also used to identify user by cookie.
    /// </summary>
    public class PrivateSession
    {
        public string Cookie { get; set; }
    }
}

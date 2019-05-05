namespace RCB.TypeScript.Models
{
    /// <summary>
    /// Represents the isomorphic session for web application.
    /// </summary>
    public class NodeSession
    {
        /// <summary>
        /// Contains public session that you can share in the browser's window object.
        /// </summary>
        public PublicSession Public { get; set; }
        /// <summary>
        /// Contains private session that can be used only by NodeServices.
        /// </summary>
        public PrivateSession Private { get; set; }
    }
}

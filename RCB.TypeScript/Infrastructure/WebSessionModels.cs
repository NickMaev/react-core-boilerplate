namespace RCB.TypeScript.Infrastructure
{
    /// <summary>
    /// Represents public session of the web application
    /// that can be shared in browser's window object.
    /// </summary>
    public class IsomorphicSessionData
    {
        public ServiceUser ServiceUser { get; set; }
    }

    /// <summary>
    /// Represents session for the server side rendering.
    /// </summary>
    public class SsrSessionData
    {
        public string Cookie { get; set; }
    }

    /// <summary>
    /// Represents the isomorphic session for web application.
    /// </summary>
    public class WebSessionContext
    {
        /// <summary>
        /// Contains public session that you can share in the browser's window object.
        /// </summary>
        public IsomorphicSessionData Isomorphic { get; set; }
        /// <summary>
        /// Contains private session that can be used only by NodeServices.
        /// </summary>
        public SsrSessionData Ssr { get; set; }
    }
}
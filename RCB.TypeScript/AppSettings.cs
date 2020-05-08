namespace RCB.TypeScript
{
    public class AppSettings
    {
        public static AppSettings Default { get; }

        protected AppSettings()
        {
        }

        static AppSettings()
        {
            Default = new AppSettings();
        }

        public bool IsDevelopment => Program.EnvironmentName == "Development";
    }
}
namespace Haiku.Flow.API.Core.Models
{
    public class UserSettingOptionValue : BaseModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public int UserSettingId { get; set; }
    }
}

namespace Haiku.Flow.API.Data.Entities
{
    public class UserSettingOptionValue : BaseEntity
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public int UserSettingId { get; set; }

        public virtual UserSetting UserSetting { get; set; }

        public UserSettingOptionValue()
        {
        }

        public UserSettingOptionValue(UserSettingOptionValue userSettingOptionValue)
        {
            Key = userSettingOptionValue.Key;
            Value = userSettingOptionValue.Value;
        }

        public Core.Models.UserSettingOptionValue ToModel()
        {
            return new Core.Models.UserSettingOptionValue
            {
                Id = Id,
                Key = Key,
                Value = Value,
                UserSettingId = UserSettingId
            };
        }
    }
}

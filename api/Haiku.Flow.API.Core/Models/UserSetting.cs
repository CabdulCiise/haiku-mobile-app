using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class UserSetting : BaseModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public bool HasOptionValues { get; set; }
        public bool IsRestricted { get; set; }
        public bool IsHidden { get; set; }
        public int DeviceType { get; set; }
        public int UserSettingGroupId { get; set; }
        public List<UserSettingOptionValue> UserSettingOptionValues { get; set; }
    }
}

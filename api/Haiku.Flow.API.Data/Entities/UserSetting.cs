using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class UserSetting : BaseEntity
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public bool HasOptionValues { get; set; }
        public int UserSettingGroupId { get; set; }
        public bool IsRestricted { get; set; }
        public bool IsHidden { get; set; }
        public int DeviceType { get; set; }

        public virtual UserSettingGroup UserSettingGroup { get; set; }
        public virtual ICollection<UserSettingOptionValue> UserSettingOptionValues { get; set; }

        public UserSetting()
        {
            UserSettingOptionValues = new HashSet<UserSettingOptionValue>();
        }

        public Core.Models.UserSetting ToModel()
        {
            return new Core.Models.UserSetting
            {
                Id = Id,
                Key = Key,
                Value = Value,
                DisplayName = DisplayName,
                Type = Type,
                HasOptionValues = HasOptionValues,
                IsRestricted = IsRestricted,
                IsHidden = IsHidden,
                DeviceType = DeviceType,
                UserSettingGroupId = UserSettingGroupId,
                UserSettingOptionValues = UserSettingOptionValues.Select(x => x.ToModel()).ToList()
            };
        }
    }
}

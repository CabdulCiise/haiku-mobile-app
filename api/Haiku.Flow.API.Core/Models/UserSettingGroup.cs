using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class UserSettingGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsHidden { get; set; }
        public List<UserSetting> UserSettings { get; set; }
    }
}

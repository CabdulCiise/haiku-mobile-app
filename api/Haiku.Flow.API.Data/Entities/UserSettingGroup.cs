using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class UserSettingGroup
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserSetting> UserSettings { get; set; }

        public UserSettingGroup()
        {
            UserSettings = new HashSet<UserSetting>();
        }

        public Core.Models.UserSettingGroup ToModel()
        {
            return new Core.Models.UserSettingGroup
            {
                Id = Id,
                Name = Name,
                UserSettings = UserSettings.Where(x => !x.IsHidden).Select(x => x.ToModel()).ToList()
            };
        }
    }
}

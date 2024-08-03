<template>
    <setting>
        <setting-item-select label="더블 클릭시 행동" ckey="buma.behaviorWhenDblClick" default="skinDefault" note="더블 클릭시의 행동입니다">
            <option value="edit">편집</option>
            <option value="history">역사</option>
            <option value="doNohting">아무것도 하지 않음</option>
            <option value="skinDefault">스킨 기본값</option>
        </setting-item-select>
        <setting-item-select
            label="점프 버튼 활성화"
            ckey="buma.enableJumpButtons"
            default="skinDefault"
            note="위/아래로 이동하는 점프 버튼을 표시할지의 여부입니다"
        >
            <option value="yes">활성화</option>
            <option value="no">비활성화</option>
            <option value="skinDefault">스킨 기본값</option>
        </setting-item-select>
    </setting>
</template>

<script>
import Common from '~/mixins/common';
import Setting from '~/components/setting';
import SettingItemCheckbox from '~/components/settingItemCheckbox';
import SettingItemSelect from '~/components/settingItemSelect';

export default {
    mixins: [Common],
    components: {
        Setting,
        SettingItemSelect,
        SettingItemCheckbox,
    }
}
</script>

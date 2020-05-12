<template>
    <div>
        <b-icon
            :id="`character-${id}`"
            :icon="icon_name"
            :variant="variant"
            font-scale="5"
            :style="{'position': 'absolute', 'right': px_position}"
        ></b-icon>
        <b-popover
            :target="`character-${id}`"
            placement="top"
            triggers="hover focus"
            :title="name"
            :content="`正在释放技能${cur_skill}`"
        ></b-popover>
    </div>
</template>

<script>
export default {
    name: "Character",
    props: {
        icon_name: String,
        state: Number,
        px_position: Number,
        cur_skill: Number,
        name: String,
        id: String
    },
    data() {
        return {
            // 0 for attack_interval, 1 for action_before_hit, 2 for action_after_hit
            // blue, yellow, green
            state_colors: ["primary", "warning", "success"]
        };
    },
    computed: {
        variant() {
            return this.state_colors[this.state];
        }
    },
    methods: {}
};
</script>
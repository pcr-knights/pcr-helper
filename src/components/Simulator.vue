<template>
    <b-card>
        <div ref="sandbox" style="position: relative; height: 80px;">
            <template v-if="show_sandbox">
                <Character
                    v-for="(knight, idx) in team"
                    :key="knight.id"
                    :icon_name="icons[idx+1]"
                    :state="status[idx+1].cur_state"
                    :px_position="px_position[idx+1]"
                    :cur_skill="status[idx+1].cur_skill"
                    :name="knight.name"
                    :id="knight.id"
                ></Character>
                <Character
                    :icon_name="icons[0]"
                    :state="status[0].cur_state"
                    :px_position="px_position[0]"
                    :cur_skill="status[0].cur_skill"
                    :name="boss.name"
                    :id="boss.id"
                ></Character>
            </template>
        </div>
        <template v-slot:footer>
            <b-button class="float-right" @click="run">开始</b-button>
        </template>
    </b-card>
</template>

<script>
import Character from "./Character";

export default {
    name: "Simulator",
    components: {
        Character
    },
    props: {
        team: Array,
        boss: Object
    },
    data() {
        return {
            is_mounted: false,
            is_init: false,
            // 0 for boss, 1-5 for knights
            icons: [
                "star-fill",
                "square-fill",
                "pentagon-fill",
                "heart-fill",
                "circle-fill",
                "triangle-fill"
            ],
            // position in game, start from right-side
            cur_position: null,
            // scaled position, start from right-side
            px_position: [0, 0, 0, 0, 0, 0],
            show_sandbox: false,

            status: [],
            time_cumulate: null,
            simulate_process: null
        };
    },
    mounted() {
        this.cur_position = [0];
        for (const knight of this.team) {
            this.cur_position.push(knight.attack_distance);
        }
        this.is_mounted = true;
    },
    watch: {
        is_mounted: {
            handler() {
                if (!this.is_mounted) return null;
                let elem = this.$refs.sandbox;
                let width = parseInt(
                    window
                        .getComputedStyle(elem, null)
                        .getPropertyValue("width")
                        .slice(0, 3)
                );
                this.$store.commit("setElementWidth", width);
                for (let i = 0; i < this.cur_position.length; ++i) {
                    this.px_position[i] =
                        this.cur_position[i] * this.$store.state.scale;
                    this.status.push({
                        // 技能循环下标
                        cur_skill_idx: 0,
                        cur_skill: 0,
                        // 攻击间隔/前摇/后摇 => 0/1/2
                        cur_state: 0,
                        cur_duration: 0 // ms
                    });
                }
                this.show_sandbox = true;
            }
        }
    },
    methods: {
        updateStatus() {
            for (let i = 0; i < this.status.length; ++i) {
                let cur_character = null;
                if (i === 0) {
                    cur_character = this.boss;
                } else {
                    cur_character = this.team[i - 1];
                }

                let stat = this.status[i];
                stat.cur_duration += this.$store.state.flush_interval;
                let cur_interval = null;
                if (stat.cur_state === 0) {
                    cur_interval = cur_character.cast_interval;
                } else {
                    let cur_skill = cur_character.cast_seq[stat.cur_skill_idx];
                    if (stat.cur_state === 1) {
                        cur_interval =
                            cur_character.skills[cur_skill].action_before_hit;
                    } else {
                        cur_interval =
                            cur_character.skills[cur_skill].action_after_hit;
                    }
                }

                if (stat.cur_duration > cur_interval) {
                    stat.cur_duration -= cur_interval;
                    stat.cur_state = (stat.cur_state + 1) % 3;
                    if (stat.cur_state === 0) {
                        stat.cur_skill_idx =
                            (stat.cur_skill_idx + 1) %
                            cur_character.cast_seq.length;
                        stat.cur_skill =
                            cur_character.cast_seq[stat.cur_skill_idx];
                    }
                }
            }
            this.time_cumulate += this.$store.state.flush_interval;
        },
        run() {
            console.log("go");
            if (this.simulate_process) {
                clearInterval(this.simulate_process);
                this.simulate_process = null;
                console.log("finish");
                return;
            }
            this.time_cumulate = 0;
            this.simulate_process = setInterval(
                this.updateStatus,
                this.$store.state.flush_interval
            );
        }
    }
};
</script>


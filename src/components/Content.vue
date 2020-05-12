<template>
    <div id="content" class="container" :style="{'margin-top': '96px'}">
        <b-jumbotron header="For pcr fans" lead="Welcome">
            <p>Have fun</p>
        </b-jumbotron>
        <div>
            <b-input-group>
                <!-- TODO: 联想输入框？还是其他什么，如何直观的进行角色选择 -->
                <!-- <b-form-input></b-form-input> -->
                <b-form-select v-model="selected" :options="options"></b-form-select>

                <template v-slot:append>
                    <b-button variant="outline-secondary">自定义角色（测试用）</b-button>
                    <b-button variant="outline-primary" @click="characterAdd">添加</b-button>
                </template>
            </b-input-group>
            <b-card>
                <template v-slot:header>
                    <div>队伍信息（暂不区分星级，装备默认全穿+满强，技能默认满强，好感默认满）</div>
                </template>
                <b-row v-for="knight in team" :key="knight.id">
                    <!-- 角色名 -->
                    <b-col cols="2">角色名：{{ knight.name }}</b-col>
                    <!-- 星级 -->
                    <b-col cols="2">星级：问就是5星</b-col>
                    <!-- 等级 -->
                    <b-col cols="2">等级：问就是满级</b-col>
                    <!-- 技能循环 -->
                    <b-col cols="6" v-text="'技能循环：'+knight.cast_seq.join('-')"></b-col>
                </b-row>
            </b-card>
            <b-card>
                <template v-slot:header>
                    <div>BOSS信息</div>
                </template>
                <b-row v-if="boss">
                    <!-- 角色名 -->
                    <b-col cols="2">BOSS名：{{ boss.name }}</b-col>
                    <!-- 技能循环 -->
                    <b-col cols="6" v-text="'技能循环：'+boss.cast_seq.join('-')"></b-col>
                </b-row>
                <template v-slot:footer>
                    <b-button class="float-right" @click="simulate">模拟</b-button>
                </template>
            </b-card>
            <Simulator v-if="simulate_flag" :key="simulate_flag" :team="team" :boss="boss"></Simulator>
        </div>
    </div>
</template>

<script>
import Simulator from "./Simulator";

export default {
    name: "Content",
    components: {
        Simulator
    },
    data() {
        return {
            selected: null,
            options: [
                { value: null, text: "Please select a knight or boss" },
                { value: 1, text: "K1" },
                // { value: 2, text: "K2" },
                // { value: 3, text: "K3" },
                // { value: 4, text: "K4" },
                // { value: 5, text: "K5" },
                { value: 0, text: "BOSS" }
            ],
            characters: [
                {
                    id: "boss_0",
                    name: "测试boss",
                    type: 0, // 0 for bosses, 1 for knights
                    attack_distance: 500,
                    cast_seq: [0, 0, 1, 0, 1],
                    cast_interval: 1000,
                    skills: [
                        {
                            action_before_hit: 500,
                            action_after_hit: 700
                        },
                        {
                            action_before_hit: 400,
                            action_after_hit: 600
                        }
                    ],
                    tp_max: 1000,
                    tp_rise: 100,
                    UB: "whatever"
                },
                {
                    id: "knight_0",
                    name: "测试英雄",
                    type: 1,
                    attack_distance: 200,
                    cast_seq: [0, 0, 1, 0, 2, 0, 0, 2],
                    cast_interval: 800,
                    skills: [
                        {
                            action_before_hit: 400,
                            action_after_hit: 600
                        },
                        {
                            action_before_hit: 500,
                            action_after_hit: 900
                        },
                        {
                            action_before_hit: 500,
                            action_after_hit: 700
                        }
                    ],
                    tp_max: 1000,
                    tp_rise: 100,
                    UB: "whatever"
                }
            ],
            team: null,
            boss: null,
            simulate_flag: 0
        };
    },
    methods: {
        characterAdd() {
            if (this.selected !== null) {
                let cur_character = this.characters[this.selected];
                if (cur_character.type) {
                    if (!this.team) {
                        this.team = [];
                    }
                    this.team.push(cur_character);
                } else {
                    this.boss = cur_character;
                }
                this.team.sort((a, b) => {
                    return a.attack_distance - b.attack_distance;
                });
            }
        },
        simulate() {
            this.simulate_flag = 0;
            this.simulate_flag = 1;
        }
    }
};
</script>
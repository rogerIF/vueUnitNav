<template>
  <el-container>
    <el-header>
      <!--顶部菜单-->
      <ul role="menubar" class="el-menu-demo el-menu--horizontal el-menu">
        <li role="menuitem" class="el-menu-item" :class="{'is-active': currentTopMenuId ===item.id }" v-for="(item,key) in menu" :key="key" @click="changeMenu(item)">
         {{item.name}}
        </li>
      </ul>
    </el-header>
    <el-container>
      <!--左侧菜单-->
      <el-aside width="200px" v-if="leftMenu">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu :default-active="leftMenu[0].path" :collapse="isCollapse" router>
          <template v-for="item in leftMenu">
            <!--有子节点-->
            <template v-if="item.children && item.children.length>0">
              <el-submenu :index="item.id+''" >
                <template slot="title">
                  <i :class="item.icon" v-if="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item :index="lastMenuItem.path" v-for="lastMenuItem in item.children" :key="lastMenuItem.id">
                  {{lastMenuItem.name}}
                </el-menu-item>

              </el-submenu>
            </template>
            <!--没有子节点-->
            <template v-else>
              <el-menu-item :index="item.path" >
                <i :class="item.icon" v-if="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </template>



        </el-menu>


      </el-aside>

      <el-main>
        <!--主体部分-->
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false,
      currentTopMenuId: 1,
      leftMenu: null,
      menu: {
        //顶部菜单
        situation: {
          id: 1, //id为必须且唯一的值
          name: "总体态势", //菜单名称
          path: "/situation" //路由，没有子菜单时，必须和router.js里的path保持一致
        },
        //顶部菜单
        enterprise: {
          id: 2,
          name: "企业画像",
          path: "",
          children: [
            //一级子菜单（左侧菜单）
            {
              id: 3,
              name: "企业视图1",
              path: "/enterprise/view1",
              icon: "el-icon-view"
            },
            {
              id: 4,
              name: "企业视图2",
              path: "/enterprise/view2",
              icon: "el-icon-service"
            }
          ]
        },
        //顶部菜单
        risk: {
          id: 5, //id为必须且唯一的值
          name: "风险监测", //菜单名称
          path: "", //路由，当有子菜单时，该值并未引用，置空即可
          children: [
            //一级子菜单（左侧菜单）
            {
              id: 6,
              name: "风险视图1",
              path: "/risk/view1",
              icon: "el-icon-location" //图标的class
            },
            {
              id: 7,
              name: "风险视图2",
              path: "/risk/view2",
              icon: "el-icon-menu",
              children: [
                //二级子菜单
                {
                  id: 8,
                  name: "风险视图2-子菜单1",
                  path: "/risk/view2-1",
                  icon: "el-icon-menu"
                },
                {
                  id: 9,
                  name: "风险视图2-子菜单2",
                  path: "/risk/view2-2",
                  icon: "el-icon-menu"
                }
              ]
            }
          ]
        }
      }
    };
  },

  methods: {
    /**
     * 点击顶部菜单事件
     * @param menu1 一级菜单对象
     */
    changeMenu(menu1) {
      //高亮显示当前顶部菜单
      this.currentTopMenuId = menu1.id;

      //改吧左侧菜单，同时进行路由跳转
      const submenuArray = menu1.children;
      if (submenuArray && submenuArray.length > 0) {
        this.leftMenu = submenuArray;
        this.$router.push(submenuArray[0].path);
      } else {
        this.leftMenu = null;
        this.$router.push(menu1.path);
      }
    }
  }
};
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="position-box">
        <div id="crical"></div>
        <div id="crical2"></div>
        <div id="crical3"></div>
        <div id="crical4"></div>
        <div id="square">
          <div id="box">
            <H1 style="text-align: center ; color: black;">เข้าสู่ระบบ</H1><br />
            <input
              v-model="email"
              class="input-custom"
              type="text"
              placeholder="ชื่อผู้ใช้ shinerut12155"
            /><br /><br />
            <input
              v-model="password"
              class="input-custom"
              type="password"
              placeholder="รหัสผ่าน"
            /><br /><br />
            <button class="button-custom" @click="login">เข้าสู่ระบบ</button
            ><br /><br />
            <!-- <ion-button  class="button-custom" color="secondary" >ตกลง</ion-button> -->

            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              "
            >
              <div
                class=""
                style="color: #19b7cd"
                @click="
                  () => {
                    router.push('/tabs/home');
                  }
                "
              >
                หน้าหลัก
              </div>
              <div
                class=""
                style="color: #19b7cd"
                @click="
                  () => {
                    router.push('/signup');
                  }
                "
              >
                สมัครสมาชิก
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
const endPoint = "https://api.system-searchpet.com";
export default defineComponent({
  components: { IonContent, IonPage },
  data() {
    return {
      email: "shinerut1234",
      password: "ballza1234",
    };
  },
  methods: {
    login() {
      axios
        .post(`${endPoint}/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == true) {
              console.log(res.data.data);
              localStorage.setItem("userData", JSON.stringify(res.data.data));
              this.router.push("/tabs/home");
            } else {
              alert(res.data.message);
            }
          }
        });
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped>
.input-custom {
  width: 100%;
  height: 50px;
  color: #19b7cd;
  border: none;
  -webkit-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
}
.button-custom {
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: #19b7cd;
  width: 100%;
  height: 40px;
}
#box {
  margin-left: 50px;
  margin-top: 50px;
  margin-right: 50px;
}
#position-box {
  position: relative;
  background-color: whitesmoke;
  height: 100%;
}
#crical {
  width: 35vw;
  height: 35vw;
  background-color: #eb6957;
  border-radius: 100%;
  top: -10%;
  right: 5%;
  position: absolute;
}
#crical2 {
  width: 35vw;
  height: 35vw;
  background-color: #eb695778;
  border-radius: 100%;
  position: absolute;
  top: -10%;
  right: -3%;
}
#crical3 {
  width: 35vw;
  height: 35vw;
  background-color: #eb6957;
  border-radius: 100%;
  position: absolute;
  bottom: -15%;
  left: 10%;
}
#crical4 {
  width: 35vw;
  height: 35vw;
  position: absolute;
  background-color: #eb695778;
  border-radius: 100%;
  bottom: -15%;
  left: 20%;
}
#square {
  width: 90vw;
  height: 530px;
  position: absolute;
  background-color: #eeeeee;
  top: 16%;
  border-radius: 0px 20px 20px 0px;
  -webkit-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
}
.I {
  text-align: right;
}
.Y {
  text-align: left;
}
</style>
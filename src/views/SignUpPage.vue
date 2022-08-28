<template>
  <ion-page>
    <ion-content :fullscreen="true" class="no-scroll">
      <div id="position-box">
        <div id="crical"></div>
        <div id="crical2"></div>
        <div id="crical3"></div>
        <div id="crical4"></div>
        <div id="square">
          <div id="box" >
            <h1 style="text-align: center;">สมัครสมาชิก</h1>
            <br />
            <input
              v-model="record.email"
              class="input-custom"
              type="text"
              name="email"
              id="email"
              placeholder="ชื่อผู้ใช้ abc@gamil.com"
            />
            <input
              v-model="record.password"
              class="input-custom"
              type="password"
              name="password"
              id="password"
              placeholder="รหัสผ่าน"
            />
            <input
              v-model="record.nickname"
              class="input-custom"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="ชื่อเล่น"
            />
            <button @click="signup" class="button-custom">สมัครสมาชิก</button
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
                style="color: #eb6957"
                @click="
                  () => {
                    router.push('/login');
                  }
                "
              >
                เข้าสู่ระบบ
              </div>
              <div
                style="color: #ecb7b0"
                @click="
                  () => {
                    router.push('/login');
                  }
                "
              >
                ยกเลิก
              </div>
            </div>
            <!-- <ion-button class="button-custom" color="secondary">เข้าสู่ระบบ</ion-button> -->
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { defineComponent } from "vue";
const endPoint = "http://128.199.103.191:3333";
export default defineComponent({
  components: { IonContent, IonPage },
  methods: {
    signup() {
      console.log(this.record);
      axios
        .post(`${endPoint}/register`, {
          ...this.record,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.router.push("/login");
          } else {
            alert("Register Error!!!");
          }
        })
        .catch((error) => {
          console.log(error);

          alert("Network Error!!!");
        });
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },

  data() {
    return {
      record: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        nick_name: "",
      },
    };
  },
});
</script>

<style scoped>
.no-scroll .scroll-content {
  overflow: hidden;
}
.button-custom {
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: #19b7cd;
  width: 100%;
  height: 40px;
}
.input-custom {
  width: 100%;
  height: 40px;
  color: #f49284;
  margin-bottom: 25px;
  border: none;
  -webkit-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 35px -13px rgba(0, 0, 0, 0.75);
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
</style>
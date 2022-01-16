<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>หน้าหลัก</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="rec" href="/tabs/rec">
          <ion-icon :icon="readerOutline" />
          <ion-label>แนะนำ</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="video" href="/tabs/video">
          <ion-icon :icon="caretForwardCircleOutline" />
          <ion-label>วิดีโอ</ion-label>
          
        </ion-tab-button>
         <ion-tab-button tab="trips" href="/tabs/trips">
          <ion-icon :icon="trainOutline" />
          <ion-label>ทริป</ion-label>
          
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, readerOutline, triangle,airplaneOutline ,alarmOutline,caretForwardCircleOutline,trainOutline} from 'ionicons/icons';

// <ion-icon name="home-outline"></ion-icon> home
// <ion-icon name="reader-outline"></ion-icon> Recommend
// <ion-icon name="caret-forward-circle-outline"></ion-icon> VDO
// <ion-icon name="subway-outline"></ion-icon> Trips

export default {
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      homeOutline, 
      triangle,
      airplaneOutline,
      alarmOutline,caretForwardCircleOutline,readerOutline,trainOutline

    }
  }
}
</script>
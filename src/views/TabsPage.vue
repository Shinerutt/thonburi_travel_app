<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="triangle" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="rec" href="/tabs/rec">
          <ion-icon :icon="ellipse" />
          <ion-label>Recommend</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="video" href="/tabs/video">
          <ion-icon :icon="square" />
          <ion-label>Video</ion-label>
          
        </ion-tab-button>
         <ion-tab-button tab="trips" href="/tabs/trips">
          <ion-icon :icon="square" />
          <ion-label>Trips</ion-label>
          
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>
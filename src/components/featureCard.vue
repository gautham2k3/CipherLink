<template>
  <div class="feature-card-container">
    <div class="feature-card" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <div class="card-content">
        <div class="icon-container">
          <img :src="icon" alt="Feature icon" class="feature-icon" />
        </div>
        <h3 class="feature-title">{{ title }}</h3>
        
        <transition name="fade">
          <div class="feature-description" v-if="isHovered">
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    }
  }
}
</script>

<style scoped>
.feature-card-container {
  width: 300px;
  margin: 5px;
}

.feature-card {
  position: relative;
  width: 100%;
  aspect-ratio: 18/6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #334155;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.feature-icon {
  max-width: 100%;
  max-height: 100%;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  color: #f1f5f97a;
}

.feature-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
}

.feature-description p {
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  margin-bottom: 16px;
  overflow-y: auto;
  max-height: 70%;
}

.learn-more-btn {
  padding: 6px 12px;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.learn-more-btn:hover {
  background-color: #006699;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

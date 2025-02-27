vue
<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <slot name="front"></slot>
        <h1>Secured Messaging</h1>
      </div>
      <div class="flip-card-back">
        <slot name="back"></slot>
        <h2>using blockchain cryptographic</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 98%;
  height: auto;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>

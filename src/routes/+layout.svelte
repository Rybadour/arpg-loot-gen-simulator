<script>
  import "../app.css";
</script>

<div class="container">
  <slot />
</div>

<style lang="postcss">
  .container {
    @apply w-[600px] mx-auto;
  }
</style>
<template>
  <div class="about">
    <div class="content">
      <h1>About SneakerStore</h1>

      <p>
        Welcome to SneakerStore, your one-stop destination for premium sneakers. We pride ourselves
        on offering a carefully curated selection of running shoes, casual sneakers, and basketball
        footwear from the world's leading brands.
      </p>

      <hr />

      <h2>Our Mission</h2>
      <p>
        Our mission is simple: to help you find the perfect pair of sneakers for every occasion.
        Whether you're hitting the track, heading to the court, or just looking for comfortable
        everyday wear, we've got you covered.
      </p>

      <hr />

      <h2>Why Choose Us?</h2>
      <p>
        We believe in quality over quantity. Every sneaker in our collection has been hand-picked by
        our team of footwear enthusiasts who understand what makes a great shoe. From cutting-edge
        running technology to timeless casual designs, we only stock products we'd wear ourselves.
      </p>

      <RouterLink to="/shop" class="shop-link"> Start Shopping </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
h1 {
  margin-bottom: 3rem;
}

h2 {
  margin-bottom: 1.5rem;
}

hr {
  margin-top: 3rem;
  margin-bottom: 2rem;
  border: none;
  border-top: 1px solid var(--divider);
}

p {
  color: var(--text-dark);
  line-height: 1.8;
  margin-bottom: 1.3rem;
}

.shop-link {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  margin-top: 2rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  line-height: 1.7;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.shop-link:hover {
  background-color: var(--black-muted);
  color: var(--green);
}
</style>

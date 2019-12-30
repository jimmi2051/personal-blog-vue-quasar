<template>
  <section
    id="call-to-action"
    class="call-to-action pt-125 pb-130 bg_cover"
    v-bind:style="{ 'background-image': 'url('+require('@/assets/images/call-to-action.jpg')+')' }"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-9">
          <div class="call-action-content text-center">
            <h2 class="action-title">Have any project on mind?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua nostrud.</p>
            <ul>
              <li>
                <a class="main-btn custom" href="#">download cv</a>
              </li>
              <li>
                <a class="main-btn custom-2" href="#">hire me</a>
              </li>
            </ul>
          </div>
          <!-- call action content -->
        </div>
      </div>
      <!-- row -->
    </div>
    <!-- container -->
  </section>
</template>
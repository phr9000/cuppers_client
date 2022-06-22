<template>
  <q-card flat>
    <q-card-section>
      <q-skeleton type="text" class="text-h3" width="40%" />
      <q-skeleton type="text" class="text-h4" width="30%" />
    </q-card-section>
    <div class="q-mx-xs q-px-sm q-pt-xs rounded">
      <q-skeleton height="400px" />
    </div>
    <q-card-section class="row">
      <div class="col-7">
        <q-skeleton type="text" class="text-h4" width="40%" />
        <q-skeleton type="text" class="text-h5" width="80%" />
        <q-skeleton type="text" class="text-h5" width="80%" />
        <q-skeleton type="text" class="text-h5" width="80%" />
      </div>
      <div class="col-5">
        <q-skeleton type="text" class="text-h4" width="40%" />
        <div class="row q-mb-sm">
          <q-item-section class="" avatar>
            <q-skeleton size="32px" type="QAvatar" /> </q-item-section
          ><q-skeleton type="text" class="text-h5" width="30%" />
        </div>

        <q-card flat bordered style="max-width: 500px">
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="80%" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <div class="row">
                <div class="col-7">
                  <q-skeleton type="text" class="text-h6" width="70%" />
                  <q-skeleton type="text" class="text-subtitle1" width="60%" />
                  <q-skeleton type="text" class="text-h5" width="60%" />
                </div>
                <div class="col-5">
                  <q-skeleton height="150px" class="q-mb-sm" />
                </div>
              </div>
              <div class="row items-center justify-between no-wrap">
                <div class="row items-center">
                  <q-icon
                    name="favorite_border"
                    color="grey-4"
                    class="q-mr-sm"
                    size="18px"
                  />
                  <q-skeleton type="text" width="30px" />
                </div>

                <q-skeleton type="text" width="80px" />
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

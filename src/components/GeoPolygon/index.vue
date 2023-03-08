<template>
  <div>
    <p v-if="coordinates === null && !gettingLocation">
      Let us locate you for better results...
      <el-button
        type="primary"
        @click="locateMe"
      >
        Locate Me
      </el-button>
    </p>
    <p v-if="gettingLocation">
      Getting your location...
    </p>
    <div
      id="map"
      style="height: 30em;"
    />
    <div v-if="coordinates">
      <el-button
        :hidden="polygon === null"
        plain
        @click="setToMap"
      >
        Redraw Area
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { toggleEnable } from '@/api/common'
import LoadScript from 'vue-plugin-load-script'

declare var google: any
@Component({
  name: 'GeoPolygon',
  props: ['value'],
  data: function() {
    return {
      coordinates: null,
      gettingLocation: false,
      map: null,
      drawingManager: null,
      polygon: null
    }
  }
})
export default class extends Vue {
  @Prop({ default: false }) gettingLocation!: Boolean;
  @Prop({ default: null }) map!: any;
  @Prop({ default: null }) drawingManager!: any;
  @Prop({ default: null }) polygon!: any;
  @Prop({ default: null }) coordinates!: any;
  @Prop() value!: any;
  loadScript!: Function;
  
  mounted() {
    this.initMap().then((status: boolean) => {
      setTimeout(() => {
        this.addSavePolygon()
      }, 500)
    })
  }

  async locateMe() {
    if (!('geolocation' in navigator)) {
      this.$notify.error({
        title: this.$tc('global.common.error'),
        message: this.$tc('geolocation.prompt.nonCompatibleBrowser')
      })
      return Promise.reject(
        new Error('We need browser with Location enabled!')
      )
    } else {
      navigator.geolocation.watchPosition(
        position => {
          this.coordinates = position.coords
          this.setCenter()
        },
        (error:any) => {
          if (error) {
            console.log(error.stack)
          }
          this.$alert(
            this.$tc('geolocation.prompt.message'),
            this.$tc('geolocation.prompt.title'),
            {
              confirmButtonText: this.$tc('global.common.ok'),
              callback: action => {
                if (action === 'confirm') {
                  navigator.geolocation.getCurrentPosition(
                    position => {
                      this.coordinates = position.coords

                      this.setCenter()
                      return Promise.resolve(true)
                    },
                    error => {
                      this.$notify.error({
                        title: this.$tc('global.common.error'),
                        message: error.message
                      })
                      return Promise.reject(new Error(error.message))
                    }
                  )
                } else {
                  this.initDrawingManager()
                  return Promise.resolve(false)
                }
              }
            }
          )
        }
      )
    }
  }

  setCenter() {
    this.map.setCenter({
      lat: this.coordinates.latitude,
      lng: this.coordinates.longitude
    })
    // add drawing manager
    this.initDrawingManager()
  }

  async initMap() {
    try {
      if (!(typeof google === 'object' && typeof google.maps === 'object')) {
        await this.loadScript(
          'https://maps.googleapis.com/maps/api/js?key=' +
            process.env.VUE_APP_GOOGLE_MAP_API +
            '&libraries=drawing'
        )
      }
      // add map
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 21.329035778926478,
          lng: 73.46008301171878
        },
        zoom: 13
      })

      await this.locateMe()
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  initDrawingManager() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      polygonOptions: {
        editable: true
      }
    })
    if (!this.value) {
      this.setToMap()
    }
    // get polygon
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (polygon: any) => {
        this.polygon = polygon
        polygon.overlay.set('editable', false)
        // set null to prevent further action
        this.drawingManager.setMap(null)

        let polygonCoordinates: string = ''
        // loop
        polygon.overlay
          .getPath()
          .getArray()
          .forEach((coordinate: any) => {
            const lat: number = parseFloat(coordinate.lat())
            const lng: number = parseFloat(coordinate.lng())
            polygonCoordinates += `(${lng},${lat}),`
          })
        if (polygonCoordinates !== '') {
          // remove last comma
          polygonCoordinates = polygonCoordinates.replace(/,\s*$/, '')
          // add brackets
          polygonCoordinates = `(${polygonCoordinates})`
        }
        // send to form
        this.$emit('input', polygonCoordinates)
      }
    )
  }

  setToMap() {
    this.drawingManager.setMap(this.map)
    if (this.polygon) {
      if (this.polygon.overlay) {
        this.polygon.overlay.setMap(null)
      } else {
        this.polygon.setMap(null)
      }
    }
  }

  async addSavePolygon() {
    // check if its edit and we need to draw existing polygon
    let polygonCoordinates = this.value
    if (polygonCoordinates) {
      // replace ( & )
      polygonCoordinates = polygonCoordinates.replace(/["'()]/g, '').split(',')
      // to get center
      const bounds = new google.maps.LatLngBounds()
      // to hold in LatLng
      const polygonLatLng = []
      // loop over coords
      for (let i = 0; i < polygonCoordinates.length; i = i + 2) {
        const latLng = new google.maps.LatLng(
          polygonCoordinates[i + 1],
          polygonCoordinates[i]
        )
        bounds.extend(latLng)
        polygonLatLng.push(latLng)
      }
      // add polygon to map
      this.polygon = new google.maps.Polygon({
        editable: false,
        path: polygonLatLng
      })
      this.polygon.setMap(this.map)
      // set new center
      this.map.setCenter(bounds.getCenter())
      // clear DrawingManager
      if (this.drawingManager) {
        this.drawingManager.setMap(null)
      }
    }
  }
}
</script>

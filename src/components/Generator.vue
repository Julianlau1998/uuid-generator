<template>
  <div id="generator">
      <h1 id="uuid">
          {{uuid}} 
        <button
            id="copyButton"
            @click="copy()"
        >
            Copy
        </button>
      </h1>
      <button
        class="btn-grad"
        @click="generate()"
    >
          Generate new UUID
      </button>
      <br><br>
      <button
        class="versionButton"
        id="versionOne"
        @click="changeVersion(1)"
        ref="versionOne"
      >
          Version 1
      </button>
      <button
        class="versionButton"
        id="versionFour"
        @click="changeVersion(4)"
        ref="versionFour"
      >
          Version 4
      </button>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
const NAMESPACE = "65f9af5d-f23f-4065-ac85-da725569fdcd";

export default {
    name: 'generator',
    data () {
        return {
            NAMESPACE,
            uuid: 0,
            version: "4",
            installUUID: uuid.v1(),
        }
    },
    created () {
        this.uuid = this.$uuid.v4()
    },
    methods: {
        async copy () {
            await navigator.clipboard.writeText(this.uuid);
        },
        generate () {
            switch (this.version) {
                case "1":
                    this.uuid = this.$uuid.v1()
                    break
                case "4":
                    this.uuid = this.$uuid.v4()
                    break
            }
        },
        changeVersion(number) {
            if (number===1) {
                this.version = '1'
                this.$refs.versionOne.style.border = '2px solid red'
                this.$refs.versionFour.style.border = '1px solid white'
            } else {
                this.version = '4'
                this.$refs.versionFour.style.border = '2px solid red'
                this.$refs.versionOne.style.border = '1px solid white'
            }
        }
    }
}
</script>

<style>
    #uuid {
        font-size: 3rem;
        margin-top: 6rem;
        color: lightgray;
    }
    #copyButton {
        width: 5em;
        height: 2.5rem;
        position: relative;
        top: -0.55rem;
        left: 1rem;
        color: lightgray;
        background: transparent;
        border: 3px solid white;
        font-weight: 800;
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 3px;
    }
    #copyButton:hover {
        border: 3px solid #28B463;
    }

    .btn-grad {
        background-image: linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%)
    }
    .btn-grad {
        margin: 10px;
        padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;            
        box-shadow: 0 0 3px #eee;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 700;
        font-size: 1.2rem;
      }

    .btn-grad:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
    .versionButton {
        width: 7rem;
        height: 2rem;
        font-size: 1.2rem;
        background: transparent;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        margin: 1rem 1.5rem 1rem 1.5rem;
    }
    #versionOne {
        border: 1px solid white
    }
    #versionFour {
        border: 2px solid red;
    }
    @media (max-width: 700px) {
        body {
            margin: 1rem;
        }
    }

         
</style>
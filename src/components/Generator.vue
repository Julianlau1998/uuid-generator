<template>
  <div id="generator">
      <h1 id="uuid">
          {{uuid}} 
        <button
            id="copyButton"
            @click="copy()"
            ref="copy"
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
      <br>
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

      <br><br><br>

      <button
        class="btn-grad-blue"
        @click="generateMultple()"
      >
          Generate Multiple
      </button>

      <input
        type="number"
        placeholder="Amount"
        id="amount"
        v-model="amount"
        @keydown.enter="generateMultple()"
      >
      <span 
        class="error"
        v-if="error"
      >
          Max. 5000
      </span>

    <br><br><br>

    <span
        @click="createPDF()"
        v-if="allUuids.length>0"
        id="download"
    >   
        Download as PDF <img src="../../public/img/download.png" alt="download icon" id="downloadIcon">
    </span>

    <br>

    <ul v-for="(uuid, uuidIndex) in allUuids" :key="uuidIndex" id="idList">
        <li>
            {{uuid}}
            <button
                id="smallCopyButton"
                @click="copyFromAll(uuidIndex)"
                :ref=uuidIndex
            >
                Copy
            </button>
        </li>
    </ul>

  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import jsPDF from 'jspdf'

export default {
    name: 'generator',
    data () {
        return {
            uuid: 0,
            version: "4",
            installUUID: uuid.v1(),
            amount: 5,
            allUuids: [],
            error: false
        }
    },
    created () {
        this.uuid = this.$uuid.v4()
    },
    methods: {
        async copy () {
            this.$refs.copy.style.border = '2px solid green'
            this.$refs.copy.style.width = '6rem;'
            this.$refs.copy.innerHTML = 'Copied!'
            await navigator.clipboard.writeText(this.uuid);
        },
        async copyFromAll(uuidIndex) {
            this.$refs[uuidIndex].style.border = '2px solid green'
            this.$refs[uuidIndex].style.width = '6rem;'
            this.$refs[uuidIndex].innerHTML = 'Copied!'
            await navigator.clipboard.writeText(this.allUuids[uuidIndex]);
        },
        generate () {
            this.$refs.copy.innerHTML = 'Copy'
            this.$refs.copy.style.border = '3px solid white'
            switch (this.version) {
                case "1":
                    this.uuid = this.$uuid.v1()
                    return this.uuid
                case "4":
                    this.uuid = this.$uuid.v4()
                    return this.uuid
            }
        },
        generateMultple () {
            if (this.amount < 5000) {
                this.error=false
                this.allUuids = [] 
                for (let i=0; i<this.amount; i++) {
                    switch (this.version) {
                        case "1":
                            this.allUuids.push(this.$uuid.v1())
                            break
                        case "4":
                            this.allUuids.push(this.$uuid.v4())
                            break
                    }
                }
            } else if (this.amount>=5000) {
                this.error = true
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
        },
        createPDF () {
            if (this.allUuids.length>0){
                let pdfName = `${this.amount}UUIDs`; 
                let doc = new jsPDF()

                let uuidString = ''
                for (let i=0; i<this.allUuids.length; i++) {
                    uuidString += ` ${this.allUuids[i]}\n\n`
                    if (i%21===0 && i!==0) {
                        doc.text(uuidString, 10, 10);
                        doc.addPage()
                        uuidString = ''
                    } else if (i===this.allUuids.length-1) {
                        doc.text(uuidString, 10, 10);
                        doc.addPage()
                    }
                }
                doc.save(pdfName + '.pdf');  
            } 
        }
    }
}
</script>

<style>
    #uuid {
        font-size: 3rem;
        margin-top: 4rem;
        color: lightgray;
    }
    #copyButton,
    #smallCopyButton {
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
    #copyButton:hover{
        border: 3px solid #28B463;
    }
     #smallCopyButton:hover {
        border: 2px solid #28B463;
    }
    #smallCopyButton {
        width: 4rem;
        height: 2rem;
        top: 0;
        border: 2px solid white;
    }
    #idList {
        list-style: none;
        margin-left: -2rem;
    }
    #download {
        width: 10rem;
        background: transparent;
        color: lightgray;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        display: inline;
    }
    #downloadIcon {
        width: 2.5rem;
        height: 2.2rem;
        position: relative;
        top: 0.8rem;
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
    #amount {
        background: transparent;
        border: 2px solid #436d88;
        border-radius: 5px;
        height: 0rem;
        width: 4.3rem;
        padding: 10px;
        padding-bottom: 1.4rem;
        padding-top: 1.1rem;
        color: lightgray;
        font-size: 1.2rem;
        margin-top: 1rem;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

    .error {
        color: red;
    }


         .btn-grad-blue {
             background-image: linear-gradient(to right, #314755 0%, #26a0da  51%, #314755  100%)
             }
         .btn-grad-blue {
            margin-right: 10px;
            width: 10.5rem;
            height: 3rem;
            padding: 15px 10px ;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 2px #eee;
            border-radius: 10px;
            cursor: pointer;
          }

          .btn-grad-blue:hover {
            background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
          }
         
    @media (max-width: 700px) {
        body {
            margin: 1rem;
        }
    }

         
</style>
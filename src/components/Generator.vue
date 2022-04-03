<template>
  <div id="generator">
    <div class="top-part">
        <span class="topnav">
            UUID Generator
        </span>
        <i
            class="fas fa-ellipsis-v settings-icon"
            @click="settings=!settings"
        />
        <span
            @click="linkToStorePage()"
            v-if="settings"
            class="settings firstSetting"
            :class="!shareAvailable ? 'firstSettingWithoutShare' : ''"
        >
            Rate This App
        </span>
        <span
            @click="recommend()"
            v-if="settings && shareAvailable"
            class="settings secondSetting"
        >
            Recommend
        </span>
        <span
            @click="makePurchase()"
            v-if="settings && playBillingSupported"
            class="settings thirdSetting mt-6"
        >
            Support the Developer
        </span>
        <h1 id="uuid">
            <span id="uuidSpan">
                {{uuid}} 
            </span>  
            <button
                id="copyButton"
                @click="copy()"
                ref="copy"
            >
            Copy
            </button>
            <img
                :style="shareAvailable ? 'opacity: 1;' : 'opacity: 0;'"
                src="../../public/img/share.png"
                alt="share"
                @click="share"
                class="share"
                ref="share"
            >
            <div class="slider"></div>
        </h1>
    </div>
    <div class="bottom-part">
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

        <br><br>

        <button
            class="btn-grad-two"
            id="btn-multiple"
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
            Max. 4999
        </span>

        <br>

        <span
            @click="createPDF()"
            v-if="allUuids.length>0"
            id="download"
        >   
            Download as PDF <img src="../../public/img/download.png" alt="download icon" id="downloadIcon">
        </span>

        <ul v-for="(uuid, uuidIndex) in allUuids" :key="uuidIndex" id="idList">
            <li>
                <span id="listUuid">
                    {{uuid}}
                </span>
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
            error: false,
            shareAvailable: false,
            settings: false,
            iOS: false,
            playBillingSupported: false
        }
    },
    created () {
        this.uuid = this.$uuid.v4()
        this.checkPlayBillingAvailable()
        if(navigator.share !== undefined) {
            this.shareAvailable = true
        }
        this.iOS = [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    },
    methods: {
        async copy () {
            this.$refs.copy.style.border = '2px solid #eedcff'
            this.$refs.copy.style.width = '6rem;'
            this.$refs.copy.innerHTML = 'Copied!'
            navigator.clipboard.writeText(this.uuid)
                .then(() => {
                    this.NativeAndroid.copyToClipboard("Clipboard API Test");
                })
        },
        async copyFromAll(uuidIndex) {
            await navigator.clipboard.writeText(this.allUuids[uuidIndex]);
            this.$refs[uuidIndex][0].style.border = '2px solid #eedcff'
            this.$refs[uuidIndex][0].innerHTML = 'Copied!'
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
            for (let i=0; i<this.allUuids.length; i++) {
                if(!this.$refs[i]) return
                this.$refs[i][0].style.border = '2px solid #ffffff'
                this.$refs[i][0].innerHTML = 'Copy'
            }
        },
        changeVersion(number) {
            if (number===1) {
                this.version = '1'
                this.$refs.versionOne.style.border = '3px solid #eedcff'
                this.$refs.versionFour.style.border = '2px solid white'
            } else {
                this.version = '4'
                this.$refs.versionFour.style.border = '3px solid #eedcff'
                this.$refs.versionOne.style.border = '2px solid white'
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
        },
        share () {
            navigator.share({
                "title": 'UUID',
                "text": this.uuid
            })
        },
        linkToStorePage () {
            if (this.iOS) {
                window.location.href = 'https://apps.apple.com/de/app/uuids-generator/id1603050260'
                return
            }
            window.location.href='https://play.google.com/store/apps/details?id=xyz.appmaker.fdfdjd&gl=DE'
        },
        recommend () {
            navigator.share({
                "title": 'Simply Generate UUIDS with this UUID Generator App',
                "text": 'https://play.google.com/store/apps/details?id=xyz.appmaker.fdfdjd&gl=DE'
            })
        },
        async checkPlayBillingAvailable () {
            if ('getDigitalGoodsService' in window) {
            // Digital Goods API is supported!
                const service = await window.getDigitalGoodsService('https://play.google.com/billing');
                if (service) {
                    this.playBillingSupported = true
                }
            }
        },
        async makePurchase(service) {
        // Define the preferred payment method and item ID
            const paymentMethods = [{
                supportedMethods: "https://play.google.com/billing",
                data: {
                    sku: 'support',
                }
            }]
            const paymentDetails = {
                total: {
                    label: `Total`,
                    amount: {currency: `USD`, value: `10.99`}
                }
            }
            const request = new PaymentRequest(paymentMethods, paymentDetails);
            try {
                const paymentResponse = await request.show();
                const {purchaseToken} = paymentResponse.details;
                await service.acknowledge(purchaseToken, 'repeatable');
            } catch(e) {
                alert('Something went wrong. Please try again.')
            }
        }
    }
}
</script>

<style>
    .topnav {
        float: left;
        font-size: 1.8rem;
        padding: 0.8rem;
    }
    .settings-icon {
        float: right;
        position: relative;
        top: 1.2rem;
        right: 1.1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .settingsWrapper {
        background-color: #2a343c;
    }
    .settings {
        position: absolute;
        top: 2.9rem;
        right: 1.6rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        background-color: #2a343c;
        width: 8rem;
        cursor: pointer;
    }
    .firstSetting {
        border-top: 2px solid #eedcff;
        border-left: 2px solid #eedcff;
        border-right: 2px solid #eedcff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .firstSettingWithoutShare {
        border: 2px solid #eedcff;
        border-radius: 5px;
    }
    .secondSetting, .thirdSetting {
        border-bottom: 2px solid #eedcff;
        border-left: 2px solid #eedcff;
        border-right: 2px solid #eedcff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .secondSetting {
        margin-top: 2.45rem;
        margin-bottom: 0.2rem;
    }
    .thirdSetting {
        margin-top: 4.6rem;
    }
    #uuid {
        font-size: 3rem;
        color: lightgray;
        padding: 2.2rem 1rem 0 1rem;
    }
    .top-part {
        position: absolute;
        top: 0;
        left: 0;
        width: 99.98vw;
        background-color: #2a343c;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        z-index: 2;
    }
    .bottom-part {
        position: absolute;
        top: 10rem;
        left: 0;
        padding-top: 10rem;
        width: 100vw;
        min-height: 94vh;
        background-color: #1a1c1e;
        z-index: 1;

    }
    #copyButton,
    #smallCopyButton {
        min-width: 5.3rem;
        height: 2.5rem;
        position: relative;
        top: -0.55rem;
        left: 1.3rem;
        color: lightgray;
        background: transparent;
        border: 3px solid white;
        font-weight: 800;
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 3px;
    }
    #copyButton:hover{
        border: 3px solid #eedcff;
    }
     #smallCopyButton:hover {
        border: 2px solid #eedcff;
    }
    #smallCopyButton {
        width: 5.5rem;
        height: 2rem;
        top: 0;
        border: 2px solid white;
    }
    #idList {
        list-style: none;
        margin-left: -2rem;
        background-color: #1a1c1e;
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

    /* .btn-grad {
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
        background-position: right center;
        color: #fff;
        text-decoration: none;
    } */
    .btn-grad,
    .btn-grad-two {
        background-color: #cbe5ff;
        border: none;
        border-radius: 20px;
        height: 3rem;
        font-size: 1.3rem;
        font-weight: 600;
        z-index: 100;
        cursor: pointer;
        color: black;
    }
    .btn-grad {
        width: 15rem;
        margin-bottom: 1.5rem;
    }
    .btn-grad-two {
        min-width: 11rem;
        font-size: 1.1rem;
        margin-right: 0.5rem;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
    }

    .versionButton {
        width: 8rem;
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
        border: 3px solid #eedcff;
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

    .share {
        cursor: pointer;
        width: 5rem;
        position: relative;
        top: 1.5rem;
        left: 1rem;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

    .error {
        color: #eedcff;
    }

    .slider {
        width: 1.5rem;
        height: 0.3rem;
        background-color: #cbe5ff;
        opacity: 0.6;
        z-index: 100;
        position: relative;
        left: 50%;
        transform: translate(-50%, -50%);
        bottom: 0.4rem;
        border-radius: 20px;
    }


         /* .btn-grad-blue {
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
            background-position: right center;
            color: #fff;
            text-decoration: none;
          } */
    
    @media (max-width: 1110px) {
        .share {
            top: 1.5rem;
            left: 2.5rem;
        }
        #uuidSpan::after{
            content: "\a";
            white-space: pre;
        }
        #copyButton {
            position: relative;
            left: 2.5rem;
        }
    }
    @media (max-width: 700px) {
        .share {
            top: -1.6rem;
            left: 2.4rem;
        }
        #uuidSpan::after{
            content: "\a\a";
            white-space: pre;
        }
        #uuid {
            margin-top: 2.5rem;
            font-size: 1.9rem;
            line-height: 1.3;
            margin-bottom: 0rem;
        }
        #listUuid {
            font-size: 0.7rem;
        }
        #copyButton {
            position: relative;
            top: -3.8rem;
        }
        #smallCopyButton {
            width: 3.5rem;
            height: 1.7rem;
            font-size: 1rem;
        }
        .versionButton {
             margin: 1rem 0.5rem 0.5rem 1rem;
        }
        .btn-grad {
            margin-top: 1rem;
        }
        .btn-grad-two {
            margin-top: 1.5rem;
        }
    }
    @media (max-width: 700px) {
        body {
            margin: 1rem;
        }
    }
    @media (min-width: 700px) {
        body {
            margin: 1rem;
        }
        .btn-grad {
            margin-top: 3rem;
        }
        .slider {
            bottom: -1.3rem;
        }
    }
    @media (min-width: 1100px) {
        .btn-grad {
            margin-top: -50rem !important;
        }
         .settings-icon {
            right: 1.7rem;
        }
        .settings {
            right: 2.4rem;
        }
    }

    @media (max-width: 344px) {
        .btn-grad {
            margin-top: 3rem;
        }
        .btn-grad-two {
            margin-top: 0rem;
        }
    }

         
</style>
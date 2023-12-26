//% color="#976dd0" iconWidth=50 iconHeight=40
namespace cnn{

    //% block="初始化音频处理模块" blockType="command" 
    export function audio_init(parameter: any, block: any){

        Generator.addImport("import scipy.io.wavfile as wav");
        Generator.addImport("import sounddevice as sd");


    }


    //% block="录制音频[SD] 采样数[NUM] 采样率[RATE] " blockType="command"
    //% SD.shadow="normal"   SD.defl="recording"
    //% NUM.shadow="normal"   NUM.defl="123"
    //% RATE.shadow="normal"   RATE.defl="123"
    export function record(parameter: any, block: any){
        let sd = parameter.SD.code
        let num = parameter.NUM.code
        let rate = parameter.RATE.code
        Generator.addCode(`${sd} = sd.rec(${num}, samplerate=${rate}, channels=1)`)
    }

    //% block="等待录音完成" blockType="command"
    export function wait(parameter: any, block: any){
        Generator.addCode(`sd.wait()`)
    }

    //% block="对象名[OBJ] 对音频[REC]数据处理" blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="pcm_audio_data"
    //% REC.shadow="normal"   REC.defl="recording"
    export function deal(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let rec = parameter.REC.code
        Generator.addCode(`
scaled_audio_data = (${rec} / np.max((abs(recording))))
${obj} = np.int16((scaled_audio_data * 32767))
        `)
    }
    
    //% block="保存音频为[SD] 采样率[RATE] 音频数据源[CHAN] " blockType="command"
    //% SD.shadow="normal"   SD.defl="file_name"
    //% RATE.shadow="normal"   RATE.defl="123"
    //% CHAN.shadow="normal"   CHAN.defl="data"
    export function save(parameter: any, block: any){
        let sd = parameter.SD.code
        let rate = parameter.RATE.code
        let chan = parameter.CHAN.code
        Generator.addCode(`wav.write(${sd}, ${rate}, ${chan})`)
    }
}
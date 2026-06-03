$source = @"
using System;
using System.IO;

public class WavGenerator {
    public static void Generate(string path, double freq, int sampleRate, int duration) {
        int numSamples = sampleRate * duration;
        int dataSize = numSamples * 2;
        int fileSize = 44 + dataSize;
        byte[] bytes = new byte[fileSize];

        bytes[0] = (byte)'R'; bytes[1] = (byte)'I'; bytes[2] = (byte)'F'; bytes[3] = (byte)'F';
        
        byte[] chunkSizeBytes = BitConverter.GetBytes(fileSize - 8);
        Buffer.BlockCopy(chunkSizeBytes, 0, bytes, 4, 4);

        bytes[8] = (byte)'W'; bytes[9] = (byte)'A'; bytes[10] = (byte)'V'; bytes[11] = (byte)'E';
        bytes[12] = (byte)'f'; bytes[13] = (byte)'m'; bytes[14] = (byte)'t'; bytes[15] = (byte)' ';

        byte[] subchunk1SizeBytes = BitConverter.GetBytes(16);
        Buffer.BlockCopy(subchunk1SizeBytes, 0, bytes, 16, 4);

        byte[] audioFormatBytes = BitConverter.GetBytes((ushort)1);
        Buffer.BlockCopy(audioFormatBytes, 0, bytes, 20, 2);

        byte[] numChannelsBytes = BitConverter.GetBytes((ushort)1);
        Buffer.BlockCopy(numChannelsBytes, 0, bytes, 22, 2);

        byte[] sampleRateBytes = BitConverter.GetBytes(sampleRate);
        Buffer.BlockCopy(sampleRateBytes, 0, bytes, 24, 4);

        byte[] byteRateBytes = BitConverter.GetBytes(sampleRate * 2);
        Buffer.BlockCopy(byteRateBytes, 0, bytes, 28, 4);

        byte[] blockAlignBytes = BitConverter.GetBytes((ushort)2);
        Buffer.BlockCopy(blockAlignBytes, 0, bytes, 32, 2);

        byte[] bitsPerSampleBytes = BitConverter.GetBytes((ushort)16);
        Buffer.BlockCopy(bitsPerSampleBytes, 0, bytes, 34, 2);

        bytes[36] = (byte)'d'; bytes[37] = (byte)'a'; bytes[38] = (byte)'t'; bytes[39] = (byte)'a';

        byte[] dataSizeBytes = BitConverter.GetBytes(dataSize);
        Buffer.BlockCopy(dataSizeBytes, 0, bytes, 40, 4);

        int idx = 44;
        for (int i = 0; i < numSamples; i++) {
            double t = (double)i / sampleRate;
            int timeStep = (int)(t / 2.0);
            double currentFreq = freq;
            int modVal = timeStep % 4;
            if (modVal == 1) {
                currentFreq = freq * 1.5;
            } else if (modVal == 2) {
                currentFreq = freq * 1.25;
            } else if (modVal == 3) {
                currentFreq = freq * 2.0;
            }

            double val = 0.4 * Math.Sin(2.0 * Math.PI * currentFreq * t);
            val += 0.15 * Math.Sin(4.0 * Math.PI * currentFreq * t);
            val += 0.05 * Math.Sin(6.0 * Math.PI * currentFreq * t);

            double envelope = 1.0;
            if (t < 2.0) {
                envelope = t / 2.0;
            } else if (t > (duration - 2.0)) {
                envelope = (duration - t) / 2.0;
            }

            short intVal = (short)(val * envelope * 16384.0);
            byte[] sampleBytes = BitConverter.GetBytes(intVal);
            bytes[idx] = sampleBytes[0];
            bytes[idx+1] = sampleBytes[1];
            idx += 2;
        }

        File.WriteAllBytes(path, bytes);
    }
}
"@

Add-Type -TypeDefinition $source

$songs = @{
    "aasa-kooda" = 440.0
    "hukum" = 220.0
    "thenpaandi" = 329.63
    "maa-tujhe-salaam" = 392.00
    "loosu-penne" = 523.25
}

if (-not (Test-Path "songs")) {
    New-Item -ItemType Directory -Path "songs" | Out-Null
}

foreach ($name in $songs.Keys) {
    $freq = $songs[$name]
    $path = "songs/$name.mp3"
    Write-Host "Compiling and generating synthetic track: $path (Freq: $freq Hz)"
    [WavGenerator]::Generate($path, $freq, 44100, 30)
}

Write-Host "Audio generation finished successfully!"

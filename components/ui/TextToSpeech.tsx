import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Square, Volume2, Settings, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const maleVoices = [
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', description: 'Deep, authoritative' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', description: 'Mature, confident' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', description: 'British, sophisticated' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', description: 'Clear, professional' },
  { id: 'bIHbv24MWmeRgasZH58o', name: 'Will', description: 'Friendly, warm' },
  { id: 'cjVigY5qzO86Huf0OWal', name: 'Eric', description: 'Articulate, smooth' },
  { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', description: 'Energetic, youthful' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', description: 'Natural, conversational' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', description: 'Rich, resonant' },
  { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill', description: 'Authoritative, clear' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', description: 'Youthful, energetic' },
  { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River', description: 'Calm, soothing' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Adam', description: 'Deep, engaging' },
  { id: '2EiwWnXFnvU5JabPnv8n', name: 'Clyde', description: 'Warm, reliable' },
  { id: '5Q0t7uMcjvnagumLfvZi', name: 'Ethan', description: 'Young, vibrant' },
  { id: '5dcCCnNzfCH2IKHzk79O', name: 'Marcus', description: 'Strong, confident' },
  { id: '5ws8v7E6wCx9FnFPz9FK', name: 'Vincent', description: 'Sophisticated, cultured' },
  { id: 'D38z5RcWu1voky8WS1ja', name: 'Fin', description: 'Irish accent, charming' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Samuel', description: 'Narrator style, clear' },
  { id: 'GBv7mTt0atIp3Br8iCZE', name: 'Thomas', description: 'Professional, articulate' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Mason', description: 'Friendly, approachable' },
  { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Ryan', description: 'Youthful, energetic' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', description: 'Calm, measured' },
  { id: 'ODq5zmih8GrVes37Dizd', name: 'Patrick', description: 'Warm, engaging' },
  { id: 'SOYHLrjzK2X1ezoPC6cr', name: 'Harry', description: 'British, authoritative' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', description: 'Young, clear' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', description: 'Deep, powerful' },
  { id: 'Yko7PKHZNXotIFUBG7I9', name: 'Antoni', description: 'Smooth, sophisticated' },
  { id: 'ZQe5CqHNLWdVhgzQqTHr', name: 'Jeremy', description: 'Clear, professional' },
  { id: 'flq6f7yk4E4fJM5XTYuZ', name: 'Michael', description: 'Authoritative, warm' },
  { id: 'g5CIjZEefAph4nQFvHAz', name: 'Ethan', description: 'Young adult, clear' },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Gideon', description: 'Mature, wise' },
  { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya', description: 'Gentle, soothing' },
  { id: 'piTKgcLEGmPE4e6mEKli', name: 'Nicole', description: 'Professional, clear' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', description: 'Narrative, engaging' },
  { id: 'q7d7vh7L1ajXMltnJBIa', name: 'Joseph', description: 'Warm, friendly' },
  { id: 'rPR8nbW7qrfcJz5NTpqA', name: 'Alex', description: 'Versatile, clear' },
  { id: 'wViXBPUzp2ZZixB1xQuM', name: 'Paul', description: 'Mature, authoritative' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam', description: 'Friendly, approachable' },
  { id: 'zlb0H2cyEjcMQUNCf9sT', name: 'Dave', description: 'Casual, relatable' },
];

const femaleVoices = [
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', description: 'Natural, expressive' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', description: 'Warm, friendly' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', description: 'Professional, clear' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', description: 'Elegant, sophisticated' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', description: 'Young, vibrant' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', description: 'Warm, maternal' },
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', description: 'Professional, confident' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', description: 'Sweet, gentle' },
  { id: '29vD33N1CtxCmqQRPOHJ', name: 'Drew', description: 'Calm, soothing' },
  { id: '6VqM3jT2dRiGtJgJO1mN', name: 'Emily', description: 'Young, cheerful' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', description: 'Strong, confident' },
  { id: 'EpLhKBn3PQqzquwf1FDP', name: 'Bella', description: 'Sweet, melodic' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', description: 'Sophisticated, elegant' },
  { id: 'GQPNzrTcxzWBvJG8K75i', name: 'Grace', description: 'Gentle, refined' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Rachel', description: 'Professional, warm' },
  { id: 'JRx4R3K1oNjklYQT7Quy', name: 'Serena', description: 'Calm, measured' },
  { id: 'LF1JBdtZ7kpMQ8gHJ5Vm', name: 'Sophia', description: 'Elegant, articulate' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', description: 'Young, energetic' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Luna', description: 'Mystical, gentle' },
  { id: 'ODq5zmih8GrVes37Dizd', name: 'Zoe', description: 'Vibrant, lively' },
  { id: 'Pjj7fGZa0FZRqXlgGC4N', name: 'Natasha', description: 'Sophisticated, clear' },
  { id: 'SOYHLrjzK2X1ezoPC6cr', name: 'Isabella', description: 'Romantic, expressive' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Olivia', description: 'Fresh, youthful' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Victoria', description: 'Regal, authoritative' },
  { id: 'Yko7PKHZNXotIFUBG7I9', name: 'Maya', description: 'Exotic, alluring' },
  { id: 'ZQe5CqHNLWdVhgzQqTHr', name: 'Emma', description: 'Friendly, approachable' },
  { id: 'bVMeCyTHy58xNoL34h3p', name: 'Amy', description: 'Cheerful, bright' },
  { id: 'eRPGLyv8TZjR1X2PdQhb', name: 'Chloe', description: 'Young, spirited' },
  { id: 'flq6f7yk4E4fJM5XTYuZ', name: 'Kate', description: 'Professional, clear' },
  { id: 'g5CIjZEefAph4nQFvHAz', name: 'Mia', description: 'Sweet, melodious' },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Ruby', description: 'Vibrant, energetic' },
  { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya', description: 'Nordic, ethereal' },
  { id: 'piTKgcLEGmPE4e6mEKli', name: 'Nicole', description: 'Sophisticated, warm' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Avery', description: 'Modern, confident' },
  { id: 'q7d7vh7L1ajXMltnJBIa', name: 'Hazel', description: 'Gentle, nurturing' },
  { id: 'rPR8nbW7qrfcJz5NTpqA', name: 'Alexis', description: 'Strong, articulate' },
  { id: 'wViXBPUzp2ZZixB1xQuM', name: 'Paige', description: 'Young professional' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Samantha', description: 'Friendly, reliable' },
  { id: 'zlb0H2cyEjcMQUNCf9sT', name: 'Diana', description: 'Elegant, refined' },
];

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to our text-to-speech application! Type any text here and I\'ll read it aloud for you.');
  const [selectedVoice, setSelectedVoice] = useState(maleVoices[0].id);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('male');
  const [apiKey, setApiKey] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const currentVoices = voiceGender === 'male' ? maleVoices : femaleVoices;

  const generateSpeech = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to use text-to-speech.",
        variant: "destructive",
      });
      return;
    }

    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate speech: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      toast({
        title: "Speech Generated",
        description: "Your text has been converted to speech successfully!",
      });
    } catch (error) {
      console.error('Error generating speech:', error);
      toast({
        title: "Error",
        description: "Failed to generate speech. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
      audio.onpause = () => setIsPlaying(false);
      
      setCurrentAudio(audio);
      audio.play();
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `speech-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const selectedVoiceData = currentVoices.find(v => v.id === selectedVoice);

  const handleGenderChange = (gender: 'male' | 'female') => {
    setVoiceGender(gender);
    const newVoices = gender === 'male' ? maleVoices : femaleVoices;
    setSelectedVoice(newVoices[0].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Text to Speech
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform your text into natural-sounding speech with AI voices
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>
              Enter your ElevenLabs API key and select a voice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">ElevenLabs API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your ElevenLabs API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Get your API key from{' '}
                <a 
                  href="https://elevenlabs.io/docs/api-reference/getting-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ElevenLabs Dashboard
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <Label>Voice Gender</Label>
              <RadioGroup 
                value={voiceGender} 
                onValueChange={handleGenderChange}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male Voices</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female Voices</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice">Voice Selection ({voiceGender === 'male' ? 'Male' : 'Female'})</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-sm text-muted-foreground">{voice.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedVoiceData && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedVoiceData.name} - {selectedVoiceData.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Text Input
            </CardTitle>
            <CardDescription>
              Enter the text you want to convert to speech
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={25000}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {text.length} / 25000 characters
              </span>
              <Button 
                onClick={generateSpeech} 
                disabled={isLoading || !apiKey.trim() || !text.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating...
                  </>
                ) : (
                  'Generate Speech'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {audioUrl && (
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Audio Player
              </CardTitle>
              <CardDescription>
                Your generated speech is ready to play
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  onClick={isPlaying ? stopAudio : playAudio}
                  size="lg"
                  className={`${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } transition-colors`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={downloadAudio}
                  size="lg"
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Voice: {selectedVoiceData?.name} ({voiceGender})
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-muted-foreground/20'
                      }`}
                      style={{ width: isPlaying ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;

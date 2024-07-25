'use client ';

import React from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import Typewriter from 'typewriter-effect';

import { fontsHandWriting } from '@/lib/fonts';

const stringSplitter = (text) => {
  const splitter = new GraphemeSplitter();
  return splitter.splitGraphemes(text);
};

const TypeWriter = ({ isSkip, setWriterDone }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-3xl font-semibold italic ${fontsHandWriting}`}
    >
      {isSkip ? (
        <span>{'Thank you for visiting. 🙌'}</span>
      ) : (
        <Typewriter
          options={{
            cursor: '✍',
            cursorClassName: 'animate-none',
            stringSplitter,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                '👋 I am <span style="color: #207fd8">Hank</span>, a software developer 👨🏻‍💻.'
              )
              .pauseFor(1500)
              .deleteAll(-10)
              .typeString(
                'This is my blog website where<br/>I store and share many useful and enjoyable articles I have read or found somewhere.'
              )
              .deleteAll(-10)
              .typeString('Thank you for visiting. 🙌')
              .pauseFor(2000)
              .deleteAll(-10)
              .typeString(
                `This website will give you a random blog post.<br/>Yes, it's a bit unusual, right?`
              )
              .pauseFor(1000)
              .typeString(
                `<br/>But if you want something specific, there are many platforms that can give you exactly what you're looking for out there.`
              )
              .callFunction(() => {
                setWriterDone(true);
              })
              .typeString('<br/>')
              .typeString('<br/>')
              .typeString(
                'This site is about what you need, not just what you want ✨'
              )
              .start();
          }}
        />
      )}
    </div>
  );
};

export default TypeWriter;

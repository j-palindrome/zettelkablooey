export const convertTextToLines = (text: string): Line[] =>
  text.split('\n').map((text) => {
    const newLine: Line = {
      t: text.replace(/^\s+/, '').replace(/\s+$/, ''),
    }
    return newLine
  })

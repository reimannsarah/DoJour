const TextEntry = () => {

  // function handleSave(e) {
  //   e.PreventDefault();

    

  // }
  
  return (
    <div className="text-form">
      <form action="" className="text-entry">
        <input type="text" placeholder="These are my thoughts today"/>
        <input type="text" placeholder="Worms and other things"/>
        <input type="date" />
        <textarea name="entry" placeholder="Dear Diary, today I stuffed a bunch of olives into the DVD player and then I remembered that I don't have a DVD player." cols={100} rows={50} ></textarea>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default TextEntry;

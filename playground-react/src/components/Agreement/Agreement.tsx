import styles from './Agreement.module.css';
import useSeen from "../../hooks/useSeen";

const Agreement = () => {
  const [ref, seen] = useSeen<HTMLDivElement>();

  // TODO: Moved the following code to a custom hook
  // const [seen, setSeen] = useState(false);
  //
  // useEffect(() => {
  //   if (!agreementSeenRef.current) {
  //     return;
  //   }
  //
  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) {
  //       setSeen(true);
  //       observer.disconnect();
  //     }
  //   }, {threshold: 1});
  //
  //   observer.observe(agreementSeenRef.current);
  //
  //   return () => observer.disconnect();
  // }, []);

  return (
    <section>
      <h2>Review and accept our terms below. (Long)</h2>
      <div className={styles.agreement}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
          fringilla purus, nec luctus mauris. Pellentesque tempus pulvinar
          nulla. Pellentesque ultricies sodales eros nec consectetur. Nulla et
          euismod neque. Donec condimentum neque et elit volutpat ultricies.
          Pellentesque quis augue dui. Morbi finibus augue vitae lobortis
          condimentum. Duis volutpat risus sed venenatis ultricies. Nulla
          hendrerit quam at ex mollis, id suscipit mi pretium. Aliquam erat
          volutpat. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Integer turpis diam, consectetur at
          euismod at, volutpat non nunc. Morbi nulla erat, aliquet id commodo
          vel, placerat at massa. Suspendisse potenti.
        </p>
        <p>
          Curabitur sit amet mauris et ipsum aliquam accumsan. Integer vel enim
          nec enim ultricies pretium vitae non ligula. Vestibulum sagittis at
          nisl in vehicula. Praesent vitae ante egestas, lacinia eros non,
          varius velit. Morbi id venenatis sapien. Nullam mattis gravida nulla
          eget dignissim. Morbi rhoncus velit quis dui consequat pulvinar. Etiam
          viverra dictum orci, ullamcorper commodo ipsum cursus vel.
        </p>
        <p>
          Aliquam sit amet velit at nulla sodales gravida. Integer sit amet erat
          neque. Phasellus ac ornare ex. Ut mattis eget ipsum et dapibus.
          Praesent varius mattis volutpat. Aliquam ut nulla a nulla sodales
          viverra. Fusce sed dolor at dolor tincidunt viverra ultricies ultrices
          lacus. Maecenas quis leo porttitor, placerat felis a, blandit ante.
          Suspendisse non consequat turpis. Nunc pretium sapien at risus
          interdum, mollis fermentum augue sollicitudin. Curabitur a faucibus
          ex, et viverra dui. Sed tempor mauris ut lorem porta interdum.
          Suspendisse tempor metus orci, vitae venenatis orci molestie placerat.
          Aliquam purus felis, finibus sed urna quis, fermentum tincidunt nulla.
        </p>
        <p>
          Mauris a pulvinar augue, vestibulum feugiat mi. Proin pretium turpis
          sagittis diam facilisis commodo. Nunc viverra accumsan justo in
          lacinia. Aliquam lobortis ligula eget lectus interdum elementum. Cras
          quis efficitur risus. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Praesent iaculis elit
          eu neque aliquet, feugiat imperdiet leo viverra. Nullam bibendum, nisi
          et dignissim laoreet, tortor arcu blandit ligula, at hendrerit lorem
          velit non lorem. Praesent lacinia, orci non tincidunt sollicitudin,
          nulla libero tempus ligula, et blandit nisl ipsum eget augue. Praesent
          in ante sed est commodo ultricies.
        </p>
        <p>
          Phasellus in elit vitae sem pharetra molestie. Nullam ut iaculis
          lectus, vitae dignissim libero. Curabitur imperdiet nibh in elit
          scelerisque iaculis. Suspendisse ante nisi, fringilla sed facilisis
          ac, imperdiet eget arcu. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam dolor libero, sagittis et ante luctus, bibendum
          semper felis. Nullam ac sapien at est gravida pulvinar. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Cras finibus, orci vel varius rhoncus, mauris elit gravida
          lorem, non aliquet ex elit quis erat. Proin fringilla neque ut
          pharetra congue. Sed pharetra nec nunc a feugiat.
        </p>
        <div className={"forObservation"} ref={ref} aria-hidden={true}></div>
      </div>
      <div>
        <button disabled={!seen}>I accept</button>
      </div>
    </section>
  );
};

export default Agreement;

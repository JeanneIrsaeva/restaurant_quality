import React from "react";
import "./QuestionsBlock.css";

const QuestionsBlock = () => {
  return (
    <section className="questions-block">
      <h2 className="questions-title">Остались вопросы?</h2>
      <p className="questions-description">
        Мы готовы подробно рассказать о сотрудничестве и ответить на любые ваши
        вопросы. Для связи используйте электронную почту:
      </p>
      <p className="questions-email">partner@verve.ru</p>
    </section>
  );
};

export default QuestionsBlock;

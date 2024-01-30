import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import styles from "./style.module.scss";

import axios from "axios";

export default function Post() {
  var [artigos, setArtigos] = useState([]);

  async function getPosts() {
    const res = await axios.get("http://localhost:8080/api/article");
    setArtigos(res.data);
    console.log(res.data);
  }

  async function handleClick(id) {
    await axios.post(`http://localhost:8080/api/article/like/${id}`, {
      userId: "65784a80eeb305eb54f56446"
    });
    getPosts();
  }

  useEffect(() => {
    getPosts();
  }, []);

  const RenderPosts = () => {
    return artigos.map((artigo) => {
      return (
        <Card key={artigo._id} className={styles.card}>
          <Card.Title className={styles.card__title}>{artigo.title}</Card.Title>
          <Card.Body className={styles.card__body}>
            <Card.Text className={styles.card__body__article}>
              {artigo.text}
            </Card.Text>
            <div className="d-flex align-items-center ">
              {artigo.likes}
              <Button 
                variant="light"
                onClick={() => handleClick(artigo._id)}>
                <AiOutlineLike />
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <Container>
      <RenderPosts />
    </Container>
  );
}

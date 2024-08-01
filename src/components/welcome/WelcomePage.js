import { useState } from "react"
import { Container, Row } from "reactstrap"

const WelcomePage = () =>{
    return(
        <Container>
            <Row>
                <h1>Welcome To 6 Degrees</h1>
                <p>6 Degrees is an innovative social networking app that has a unique approach to reaching others.
                    It leverages the power of social connections by forming a branching network that can be traced and visualized.</p>
                <p>
                The theory of six degrees of separation suggests that all people on Earth are separated by no more than six social connections. The concept was originally coined in 1929 by the Hungarian writer Frigyes Karinthy, although it was later popularized in a 1967 study by psychologist Stanley Milgram.
The theory is based on the idea that each person is connected to every other person in the world through a chain of acquaintances that has no more than five intermediaries.
</p>
<p>
For example:
You know a friend.
That friend knows another friend.
That person knows someone else.
And so on, until the 6th person is connected to anyone else on the planet.

The theory relies on the assumption that human societies, despite their vast numbers, are closely interconnected through successive layers of acquaintances and connections. It suggests that the world is much more interconnected than it may seem at first glance.
                </p>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to connect the world by putting the power of the 6 degree theory into your hands.
                </p>
                <h2>How It Works</h2>
                <p>When a post is created on 6 degrees, and distributed elsewhere, the app creates a digital paper trail, and remembers every hand it is passed through.
                    Upon opening a post, you can view every social connection the post has traveled through to reach you. Additionally, you can see the journey the post takes after it leaves your hands and is passed to others.

                </p>
            </Row>
        </Container>
    )
}

export default WelcomePage
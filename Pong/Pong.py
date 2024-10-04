import pygame
import sys
import random

WIDTH, HEIGHT = 600, 300
PADDLE_WIDTH, PADDLE_HEIGHT = 10, 45
BUTTON_WIDTH, BUTTON_HEIGHT = 100, 30
POSITION_LEFT, POSITION_RIGHT = WIDTH//2 - 10, HEIGHT // 2 - 35
button_start = pygame.Rect(WIDTH//2 - BUTTON_WIDTH - 10, HEIGHT - BUTTON_HEIGHT - 10, BUTTON_WIDTH, BUTTON_HEIGHT)
button_stop = pygame.Rect(WIDTH//2 + 10 , HEIGHT - BUTTON_HEIGHT - 10, BUTTON_WIDTH, BUTTON_HEIGHT)
ball = pygame.Rect(POSITION_LEFT, POSITION_RIGHT, 20, 20)
lastPosition = (HEIGHT - 50 )//2 - PADDLE_HEIGHT//2

def startbutton() :
    mouse_pos = pygame.mouse.get_pos()
    if button_start.collidepoint(mouse_pos):
        pygame.draw.rect(screen, (255, 0, 255), button_start)
    else:
        pygame.draw.rect(screen, (119, 7, 55), button_start)
    
    font = pygame.font.Font(None, 30) # Set up the font
    text_surface = font.render("Start", True, (0,0,0)) # Render the text
    text_rect = text_surface.get_rect(center=button_start.center) # Get the rectangle of the text surface and center it on the button
    screen.blit(text_surface, text_rect) # Draw the text on the screen

def stopbutton() :
    mouse_pos = pygame.mouse.get_pos()
    if button_stop.collidepoint(mouse_pos):
        pygame.draw.rect(screen, (255, 0, 255), button_stop)
    else:
        pygame.draw.rect(screen, (119, 7, 55), button_stop)

    font = pygame.font.Font(None, 30) # Set up the font
    text_surface = font.render("Stop", True, (0,0,0)) # Render the text
    text_rect = text_surface.get_rect(center=button_stop.center) # Get the rectangle of the text surface and center it on the button
    screen.blit(text_surface, text_rect) # Draw the text on the screen

def background() :
    screen.fill((195, 177, 225)) # Fill the background
    pygame.draw.line(screen, (0, 0, 0), (WIDTH//2, 0), (WIDTH//2, HEIGHT - 50), 1) # Middle Line
    pygame.draw.line(screen, (0, 0, 0,), (0, HEIGHT - 50), (WIDTH, HEIGHT - 50), 1) # Button Line
    startbutton()
    stopbutton()
   
def drawBall() :
    pygame.draw.ellipse(screen, (255, 255, 255), ball)

def startscreen() :
    pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, lastPosition, PADDLE_WIDTH, PADDLE_HEIGHT)) # Paddle
    drawBall()

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")

background()
startscreen()

clock = pygame.time.Clock()
direction = -5
speed = 1
speed_increment = 0.5
start = False
running = True

ball_dx = random.choice([-1, 1]) * speed
ball_dy = random.choice([-1, 1]) * speed

while running :
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        startbutton()
        stopbutton()

        if start :
            # Move the ball
            ball.x += ball_dx
            ball.y += ball_dy

        # Ball collision with the walls (left, right)
            if ball.x <= 0 or ball.x >= WIDTH - ball.width:
                ball_dx = -ball_dx  # Reverse horizontal direction
                speed += speed_increment  # Increase speed
                ball_dx = (ball_dx / abs(ball_dx)) * speed  # Normalize direction with new speed

        # Ball collision with the top and bottom
        if ball.y <= 0 or ball.y >= HEIGHT - 50 - ball.height:  # Ensuring it stays above the bottom line
            ball_dy = -ball_dy  # Reverse vertical direction
            speed += speed_increment  # Increase speed
            ball_dy = (ball_dy / abs(ball_dy)) * speed

        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 :
            x, y = event.pos
            if button_start.collidepoint(x,y):
                start = True
                newPosition_left = POSITION_LEFT + direction
                lastPosition = (HEIGHT - 50 )//2 - PADDLE_HEIGHT//2

            if button_stop.collidepoint(x,y):
                start = False
                background()
                startscreen()

        if event.type == pygame.MOUSEMOTION and start:
            x, y = event.pos
            if y < HEIGHT - PADDLE_HEIGHT - 50 + 1 :
                lastPosition = y
            
        background()
        drawBall()
        pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, lastPosition, PADDLE_WIDTH, PADDLE_HEIGHT)) #Paddle
        pygame.display.flip()
        clock.tick(60)

pygame.quit()
sys.exit()
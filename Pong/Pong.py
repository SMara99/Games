import pygame
import sys

# Constants
WIDTH, HEIGHT = 600, 300
PADDLE_WIDTH, PADDLE_HEIGHT = 10, 45
BUTTON_WIDTH, BUTTON_HEIGHT = 100, 30

def startbutton() :
    # Button rectangle
    button = pygame.Rect(WIDTH//2 - 50, HEIGHT - BUTTON_HEIGHT - 10, BUTTON_WIDTH, BUTTON_HEIGHT)
    pygame.draw.rect(screen, (119, 7, 55), button)

    # Render the text
    text_surface = font.render("Start", True, (195, 177, 225))

    # Get the rectangle of the text surface and center it on the button
    text_rect = text_surface.get_rect(center=button.center)

    # Draw the text on the screen
    screen.blit(text_surface, text_rect)

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")

# Set up the font (None means default font, 30 is font size)
font = pygame.font.Font(None, 30)

# Fill the background
screen.fill((195, 177, 225))

# Middle Line
pygame.draw.line(screen, (0, 0, 0), (WIDTH//2, 0), (WIDTH//2, HEIGHT - 50), 1)
# Bottom Line
pygame.draw.line(screen, (0, 0, 0,), (0, HEIGHT - 50), (WIDTH, HEIGHT - 50), 1)

# Paddle
pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, HEIGHT//2 - PADDLE_HEIGHT//2, PADDLE_WIDTH, PADDLE_HEIGHT))

# Start Button
startbutton()

running = True
while running :
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.MOUSEMOTION:
            x, y = event.pos

            if y < HEIGHT - PADDLE_HEIGHT - 50 + 1 :
                # Fill the background
                screen.fill((195, 177, 225))

                # Middle Line
                pygame.draw.line(screen, (0, 0, 0), (WIDTH//2, 0), (WIDTH//2, HEIGHT - 50), 1)
                # Button Line
                pygame.draw.line(screen, (0, 0, 0,), (0, HEIGHT - 50), (WIDTH, HEIGHT - 50), 1)

                #Paddle
                pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, y, PADDLE_WIDTH, PADDLE_HEIGHT))

        startbutton()

        # Update the display
        pygame.display.flip()

# Clean up
pygame.quit()
sys.exit()
import pygame
import sys

# Set up constants
WIDTH, HEIGHT = 300, 350

CELL_SIZE = WIDTH // 3
GRID_COLOR = (0, 0, 0)  # Black
BACKGROUND_COLOR = (195, 177, 225)  # Pastel Purple
LINE_COLOR = (0, 0, 0)  # Black

BUTTON_COLOR = (119, 7, 55)  # Mulberry
BUTTON_HOVER_COLOR = (218, 112, 214)  # Orchid
BUTTON_TEXT_COLOR = (255, 255, 255)  # White

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tic-Tac-Toe")

# Button properties
button_rect = pygame.Rect(100, 310, 100, 30)  # x, y, width, height

# Font
font = pygame.font.SysFont(None, 24)

# Create a 3x3 grid
grid = [['' for _ in range(3)] for _ in range(3)]  # Empty grid

# Function to draw the grid
def draw_grid():
    # Draw vertical lines
    pygame.draw.line(screen, LINE_COLOR, (CELL_SIZE, 0), (CELL_SIZE, HEIGHT - 60), 3)
    pygame.draw.line(screen, LINE_COLOR, (2 * CELL_SIZE, 0), (2 * CELL_SIZE, HEIGHT - 60), 3)
    
    # Draw horizontal lines
    pygame.draw.line(screen, LINE_COLOR, (0, CELL_SIZE), (WIDTH, CELL_SIZE), 3)
    pygame.draw.line(screen, LINE_COLOR, (0, 2 * CELL_SIZE), (WIDTH, 2 * CELL_SIZE), 3)

# Function to draw the X's and O's
def draw_marks():
    for row in range(3):
        for col in range(3):
            if grid[row][col] == 'X':
                pygame.draw.line(screen, LINE_COLOR, 
                                 (col * CELL_SIZE + 20, row * CELL_SIZE + 20),
                                 (col * CELL_SIZE + CELL_SIZE - 20, row * CELL_SIZE + CELL_SIZE - 20), 5)
                pygame.draw.line(screen, LINE_COLOR, 
                                 (col * CELL_SIZE + CELL_SIZE - 20, row * CELL_SIZE + 20),
                                 (col * CELL_SIZE + 20, row * CELL_SIZE + CELL_SIZE - 20), 5)
            elif grid[row][col] == 'O':
                pygame.draw.circle(screen, LINE_COLOR, 
                                   (col * CELL_SIZE + CELL_SIZE // 2, row * CELL_SIZE + CELL_SIZE // 2), 
                                   CELL_SIZE // 2 - 20, 5)
                
# Function to draw the reset button
def draw_button():
    # Check if mouse is over the button
    mouse_pos = pygame.mouse.get_pos()
    if button_rect.collidepoint(mouse_pos):
        pygame.draw.rect(screen, BUTTON_HOVER_COLOR, button_rect)
    else:
        pygame.draw.rect(screen, BUTTON_COLOR, button_rect)
    
    # Draw button text
    text_surface = font.render('New Game', True, BUTTON_TEXT_COLOR)
    text_rect = text_surface.get_rect(center=button_rect.center)
    screen.blit(text_surface, text_rect)

# Function to reset the grid
def reset_grid():
    global grid
    grid = [['' for _ in range(3)] for _ in range(3)]  # Reset to an empty grid

# Check whose turn it is 
turn = True 
# Check for game end 
game_over = True

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Check for mouse clicks
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:  # Left click
            x, y = event.pos
            if button_rect.collidepoint(x, y):
                # Reset the grid if the button is clicked
                reset_grid()
                turn = True 
                game_over = True

            elif y < 300 and game_over:  # Check if click is within the grid, ignoring the reset button area
                col = x // CELL_SIZE
                row = y // CELL_SIZE

                # Place an 'X' or 'O' in the grid if the space is empty
                if grid[row][col] == '' and turn:
                    grid[row][col] = 'X'  # For this example, we place 'X'
                    turn = False
                elif grid[row][col] == '':
                    grid[row][col] = 'O'  # For this example, we place 'O'
                    turn = True

        #Check for three in a row/column/diagonal
        for i in range(3):
            if (grid[i][0] == grid[i][1] == grid[i][2] == 'X' or grid[i][0] == grid[i][1] == grid[i][2] == 'O') and game_over:  
                #pygame.draw.line(screen, (255, 0, 0), (0, i * CELL_SIZE + CELL_SIZE // 2), (WIDTH, i * CELL_SIZE + CELL_SIZE // 2), 5)
                game_over = False
                
            if (grid[0][i] == grid[1][i] == grid[2][i] == 'X' or grid[0][i] == grid[1][i] == grid[2][i] == 'O') and game_over:  
                game_over = False
                #pygame.draw.line((255, 0, 0), (), (), 3)

        if (grid[0][0] == grid[1][1] == grid[2][2] == 'X' or grid[0][0] == grid[1][1] == grid[2][2] == 'O') and game_over:  
            game_over = False
            #pygame.draw.line((255, 0, 0), (), (), 3)
        if (grid[0][2] == grid[1][1] == grid[2][0] == 'X' or grid[0][2] == grid[1][1] == grid[2][0] == 'O') and game_over:  
            game_over = False
            #pygame.draw.line((255, 0, 0), (), (), 3)

    # Fill the background
    screen.fill(BACKGROUND_COLOR)

    # Draw the grid and marks
    draw_grid()
    draw_marks()

    # Draw the reset button
    draw_button()

    # Update the display
    pygame.display.flip()

# Clean up
pygame.quit()
sys.exit()
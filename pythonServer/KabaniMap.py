import numpy as np
from PIL import Image


class KabaniMap:
    
    def __init__(self, map: np.array = np.array([]), nieghbours: dict = {},  step: float = 0.1, ep: float = 0.1):
        self.map = map
        self.step = step
        self.ep = ep
        self.nieghbours = nieghbours

    def copy(self):
        return KabaniMap(self.map.copy(), self.nieghbours.copy(), self.step)

    def initialize_nieghbours(self):
        print(self.map.shape)
        self.nieghbours = {f"{i},{j}": 
                            {"locations": self.get_neighbours(i, j)[:, :2], 
                             "distances": np.array([np.sqrt((i*self.step-niegbour[0])**2 + (j*self.step-niegbour[1])**2) for niegbour in self.get_neighbours(i, j)])} 
                            for i in range(self.map.shape[1]) for j in range(self.map.shape[0])}
        #self.nieghbours = np.array([[self.get_neighbours(i*self.step, j*self.step)[:, :2] for i in range(self.map.shape[1])] for j in range(self.map.shape[0])], dtype="float32")
        return self

    def convert_np_bit_map(self, np_bit_map):
        """ np_bit_map = self.shrink(np_bit_map, 100, 100)
        step = step*2 """
        self.map = np.array([[[ round(i*self.step, 1), round(j*self.step, 1),     # 0, 1 = x, y
                                0,                                      # 2 = travel factor
                                0,                                      # 3 = g_cost
                                0,                                      # 4 = h_cost
                                0,                                      # 5 = f_cost
                                0,                                      # 6 = (0 = not in any list, 1 = in open list, 2 = in closed list)
                                0, 0,                                   # 7, 8 = parent_x, parent_y
                                0, 0, 0,                                # 9, 10, 11 = R, G, B
                                ]
                              if np_bit_map[i][j] == 0 else
                              [ round(i*self.step, 1), round(j*self.step, 1),     # 0, 1 = x, y
                                1,                                      # 2 = travel factor
                                0,                                      # 3 = g_cost
                                0,                                      # 4 = h_cost
                                0,                                      # 5 = f_cost
                                0,                                      # 6 = (0 = not in any list, 1 = in open list, 2 = in closed list)
                                0, 0,                                   # 7, 8 = parent_x, parent_y
                                255, 255, 255,                          # 9, 10, 11  = R, G, B
                                ]
                              for i in range(np_bit_map.shape[1])] for j in range(np_bit_map.shape[0])])   
        #self.initialize_nieghbours()
        return self
    
    def get_block_ranges(self, config):
        return np.array([[
                        [item["BR"]["x"][0] + item["current"][0],
                            item["BR"]["x"][1] + item["current"][0]],
                        [item["BR"]["y"][0] + item["current"][1],
                            item["BR"]["y"][1] + item["current"][1]]
                        ] for item in config["prims"].values()])

    def generate_map(self, config):
        block_ranges = self.get_block_ranges(config=config)
        raws = int(
            round(np.divide(config["length"], self.step)))
        columns = int(
            round(np.divide(config["width"], self.step)))
        self.map = np.array([[[ round(i*self.step, 2), round(j*self.step, 2),     # 0, 1 = x, y
                                0,                                      # 2 = travel factor
                                0,                                      # 3 = g_cost
                                0,                                      # 4 = h_cost
                                0,                                      # 5 = f_cost
                                0,                                      # 6 = (0 = not in any list, 1 = in open list, 2 = in closed list)
                                0, 0,                                   # 7, 8 = parent_x, parent_y
                                0, 0, 0,                                # 9, 10, 11 = R, G, B
                                ]
                              if np.any(np.multiply(np.multiply(block_ranges[:, 0, 0] <= i*self.step,  i*self.step <= block_ranges[:, 0, 1]), np.multiply(block_ranges[:, 1, 0] <= j*self.step,  j*self.step <= block_ranges[:, 1, 1])))
                              else [round(i*self.step, 2), round(j*self.step, 2),     # 0, 1 = x, y
                                    1,                                      # 2 = travel factor
                                    0,                                      # 3 = g_cost
                                    0,                                      # 4 = h_cost
                                    0,                                      # 5 = f_cost
                                    0,                                      # 6 = (0 = not in any list, 1 = in open list, 2 = in closed list)
                                    0, 0,                                   # 7, 8 = parent_x, parent_y
                                    255, 255, 255,                          # 9, 10, 11 = R, G, B
                                    ]
                              for i in range(columns)] for j in range(raws)])
        return self

    def get_tile(self, x, y):
        y = round(y/self.step)
        x = round(x/self.step)
        return self.map[min(max(y, 0), self.map.shape[0] - 1)][min(max(x, 0), self.map.shape[1] - 1)]

    def get_index(self, x, y):
        i = round(y/self.step)
        j = round(x/self.step)
        return i, j
    
    def draw_path(self, path, color=(0, 0, 255)):
        for i in range(path.shape[0]):
            point = path[i]
            self.get_tile(point[0], point[1])[9:12] = color

    def add_padding(self, padding, padder):
        def pad_with(vector, pad_width, iaxis, kwargs):
            pad_value = kwargs.get('padder', 10)
            vector[:pad_width[0]] = pad_value
            vector[-pad_width[1]:] = pad_value
        self.convert_np_bit_map(np.pad(np.transpose(self.get_bitmap().copy()), padding, pad_with, padder=padder))

    def add_stroke(self, stroke):
        y = self.map.copy()
        if stroke == 0:
            return self.map
        edge_circles = []
        corner_circles = []
        for i in range(self.map.shape[0]):
            for j in range(self.map.shape[1]):
                if y[i, j, 2] == 0:
                    if (y[i-stroke if i-stroke >= 0 else 0:i+stroke+1 if i+stroke+1 < self.map.shape[0] else self.map.shape[0],
                          j-stroke if j-stroke >= 0 else 0:j+stroke+1 if j+stroke+1 < self.map.shape[1] else self.map.shape[1], 2] == 0).all():
                        continue
                    up = y[i-1 if i-1 >=0 else 0, j, 2] == 0
                    down = y[i+1 if i+1 < self.map.shape[0] else self.map.shape[0]-1, j, 2] == 0
                    left = y[i, j-1 if j-1 >=0 else 0, 2] == 0
                    right = y[i, j+1 if j+1 < self.map.shape[1] else self.map.shape[1]-1, 2] == 0
                    # corners
                    if  ((up and left) and not (down or right)) or ((up and right) and not (down or left)) or ((down and left) and not (up or right)) or ((down and right) and not (up or left)):
                        corner_circles.append([j*self.step, i*self.step])
                    # edges
                    if  ((up and left) and not (down and right)) or ((up and right) and not (down and left)) or ((down and left) and not (up and right)) or ((down and right) and not (up and left)):
                        edge_circles.append([j*self.step, i*self.step])
                    """ else:
                        self.map[i-stroke if i-stroke >= 0 else 0:i+stroke+1 if i+stroke+1 < self.map.shape[0] else self.map.shape[0],
                                j-stroke if j-stroke >= 0 else 0:j+stroke+1 if j+stroke+1 < self.map.shape[1] else self.map.shape[1], 2] = 0
                        self.map[i-stroke if i-stroke >= 0 else 0:i+stroke+1 if i+stroke+1 < self.map.shape[0] else self.map.shape[0],
                                j-stroke if j-stroke >= 0 else 0:j+stroke+1 if j+stroke+1 < self.map.shape[1] else self.map.shape[1], 8:11] = 0 """
        self.add_circles(np.array(edge_circles), ((stroke )*self.step), 0)
        self.add_circles(np.array(corner_circles), ((stroke + 2.5)*self.step), 0)
        return self
    
    def add_circles(self, circles, r, c):
        tiles = np.expand_dims(np.expand_dims(np.array([self.get_tile(circles[i, 0], circles[i, 1]) for i in range(len(circles))]), axis=2), axis=3)    
        d = np.sqrt(np.add(np.power((tiles[:, 0] - self.map[:, :, 0]), 2), np.power((tiles[:, 1] - self.map[:, :, 1]), 2)))
        f = np.min(np.where(d < r, (d/r)*c, 1), axis=0)
        self.map[:, :, 2] = np.minimum(f, self.map[:, :, 2])
        self.map[:, :, 9:12] = np.minimum(np.expand_dims(np.multiply(np.expand_dims(np.array([255]), axis=1), f), axis=2), self.map[:, :, 9:12])

    def add_ellipses(self, ellipses, p, m, c):
        tiles = np.expand_dims(np.expand_dims(np.array([[self.get_tile(ellipses[i, 0, 0], ellipses[i, 0, 1]), self.get_tile(ellipses[i, 1, 0], ellipses[i, 1, 1])] for i in range(len(ellipses))]), axis=3), axis=4)
        r = p + m*np.sqrt(np.power((tiles[:,0,0] - tiles[:,1,0]), 2) + np.power((tiles[:,0,1] - tiles[:,1,1]), 2))      
        d = np.sqrt(np.add(np.power((tiles[:,0,0] - self.map[:, :, 0]), 2), np.power((tiles[:,0,1] - self.map[:, :, 1]), 2))) + np.sqrt(np.add(np.power((tiles[:,1,0]) - self.map[:, :, 0], 2), np.power((tiles[:,1,1] - self.map[:, :, 1]), 2)))
        f = np.min(np.where(d < r, (d/r)*c, 1), axis=0)
        self.map[:, :, 2] = np.minimum(f, self.map[:, :, 2])
        self.map[:, :, 8:11] = np.minimum(np.expand_dims(np.multiply(np.array([255]), f), axis=2), self.map[:, :, 8:11])
        
    def get_distance(self, o, d):
        return np.sqrt((o[0]-d[0])**2 + (o[1]-d[1])**2)

    def get_neighbours(self, x, y):
        #return self.map[max(y-1, 0):min(max(y+2, 2), self.map.shape[0]), max(x-1, 0):min(max(x+2, 2), self.map.shape[1])]
        return np.array([self.map[i][j] for i in range(max(y-1, 0), min(max(y+2, 2), len(self.map))) for j in range(max(x-1, 0), min(max(x+2, 2), len(self.map[0])))], dtype="float32")

    def get_bitmap(self):
        return self.map[:, :, 2]

    def to_image(self):
        return Image.fromarray(self.map[:,:,9:12].astype(dtype=np.uint8), 'RGB')
    
    def show(self):
        self.to_image().show()
        
    def aStar(self, start, target, max_steps=None, pref_path=[]):
        self.map[:, :, 3:7] = np.array([0, 0, 0, 0])

        if len(pref_path) > 0:
            path = np.around(np.divide(pref_path, self.step)).astype("int32")
            self.map[path[:, 1], path[:, 0], 2] += 0.005
               
        def retracePath(c):  # traceback the path
            print("retracing path")
            c = self.get_tile(c[0], c[1])
            path = [[c[0], c[1]]]
            parent = self.get_tile(c[7], c[8])  # getting its parent
            
            if (c[:2] == start[:2]).all():
                return path
            while not np.all(parent == start):  # looping until we reach the start tile
                parent = self.get_tile(c[7], c[8]) # getting the parent for the loop
                c = parent  # the parent tile is now the current
                path.insert(0, [c[0], c[1]])
            return np.array(path)  # returning the final path

        count = 0  # starting a count to know how many steps the A-Star preformed
        open_color = np.array([255, 0, 0]) # the color for the open tiles
        closed_color = np.array([0, 255, 0])  # the color for the closed tiles
        start = self.get_tile(start[0], start[1]) # getting the start tile from the self
        target = self.get_tile(target[0], target[1]) # gettng the target tile from the map

        if start[0] == target[0] and start[1] == target[1]:
            print("A-Start steps preformed:", count)
            return np.array([[target[0], target[1]]]), count, "start is target"
            
        """ if target[2] < 0.01:  # checking if the target point is totaly blocked
            print("target point must not be blocked")
            return np.array([]), count, "target is blocked" """

        start[6] = 1 # adding the starting tile to the open list
        print("starting A-star loop")
        while len(self.map[np.where(self.map[:, :, 6] == 1)]):  # looping if there are tiles in the open list
            count += 1  # incrementing the step counter
            if max_steps != None and count > max_steps:
                print("A-Star max steps reached approximating path")
                start[6] = 0
                points = self.map[np.where(self.map[:, :, 6] == 2)]
                #d_target = np.sqrt(np.power(target[0] - points[:,0], 2) + np.power(target[1] - points[:, 1], 2))
                if len(pref_path) == 0:
                    new_target = np.argmin(points[:, 4])
                else:
                    f = np.min(np.sqrt(np.power(np.expand_dims(points[:, 0], axis=1) - pref_path[:, 0], 2) + np.power(np.expand_dims(points[:, 1], axis=1) - pref_path[:, 1], 2)), axis=1)
                    new_target = np.argmin(points[:, 4] + f)

                print("A-Start steps preformed:", count)
                path = retracePath(points[new_target])
                self.draw_path(path)
                return path, count, "approximated"

            open_list = self.map[np.where(self.map[:, :, 6] == 1)]
            current_index = np.argmin(open_list[:, 5]) # getting the tile with the least f_cost
            current = self.get_tile(open_list[current_index][0], open_list[current_index][1])
            current[6] = 2
            current[9:12] = closed_color
            if np.all(current[:2] == target[:2]): # checking if current_x, current_y == target_x, target_y
                print("A-Start steps preformed:", count) # printing the steps needed for A-Star
                path = retracePath(current)
                self.draw_path(path)
                try:
                    self.to_image().save("test2.jpg")
                except:
                    print("cound not save image")
                return path, count, "accurate" # returning the path obtained by A-Star

            # looping over the neighbours of the current tile
            nieghbours = self.nieghbours[f"{round(current[0]/self.step)},{round(current[1]/self.step)}"]
            for tile_index in range(len(nieghbours["locations"])):
                tile = self.get_tile(nieghbours["locations"][tile_index][0], nieghbours["locations"][tile_index][1])
                is_in_open_list = True if tile[6] == 1 else False
                is_in_closed_list = True if tile[6] == 2 else False
                
                if tile[2] > 0 and not is_in_closed_list: # checking if the tile is blocked totaly or already in closed list                  
                    cost_to_neighbour = (current[3] + nieghbours["distances"][tile_index])/max(tile[2], 0.001)  # getting cost for neigbour

                    if not is_in_open_list or cost_to_neighbour < tile[3]: # checking if the tile is not in open list or has lower g_cost
                        tile[3] = cost_to_neighbour # assigning the g_cost of the tile 
                        tile[7:9] = np.array([current[0], current[1]]) # assigning the parent of the tile as the current

                    if not is_in_open_list: # checking if the tile is not in the open list
                        tile[4] = self.get_distance(tile, target) # getting its h_cost
                        tile[9:12] = open_color  # giving it the open color
                        tile[6] = 1  # adding it to the open list

                    tile[5] = tile[3] + tile[4]
    
            if count%100 == 0:
                try:
                    self.to_image().save("Astar-porosess.png")
                except:
                    print("cound not save image")
                    
        # maybe for error or the target tile is blocked
        print("A-Star can't find path approximating path")
        start[6] = 0
        points = self.map[np.where(self.map[:, :, 6] == 2)]
        #d_target = np.sqrt(np.power(target[0] - points[:,0], 2) + np.power(target[1] - points[:, 1], 2))
        try:
            if len(pref_path) == 0:
                new_target = np.argmin(points[:, 4])
            else:
                f = np.min(np.sqrt(np.power(np.expand_dims(points[:, 0], axis=1) - pref_path[:, 0], 2) + np.power(np.expand_dims(points[:, 1], axis=1) - pref_path[:, 1], 2)), axis=1)
                new_target = np.argmin(points[:, 4] + f)
            print("A-Start steps preformed:", count)
            path = retracePath(points[new_target])
            self.draw_path(path)
            return path, count, "approximated"
        except:
            return np.array([]), count, "error"


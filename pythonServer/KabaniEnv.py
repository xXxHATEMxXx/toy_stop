import random
import numpy as np
import KabaniMap


class KabaniEnv():

    def __init__(self) -> None:
        self.env_1 = {"length": 20,
                 "width": 20,
                 "prims": {
                        "table_1": {"prim_path": "/Table_1",
                                    "origin": (2, 2),
                                    "current": (2, 2),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_2": {"prim_path": "/Table_2",
                                    "origin": (5.5, 2),
                                    "current": (5.5, 2),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_3": {"prim_path": "/Table_3",
                                    "origin": (9, 2),
                                    "current": (9, 2),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_4": {"prim_path": "/Table_4",
                                    "origin": (2, 5.5),
                                    "current": (2, 5.5, 0),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_5": {"prim_path": "/Table_5",
                                    "origin": (2, 9),
                                    "current": (2, 9),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_6": {"prim_path": "/Table_6",
                                    
                                    "origin": (5.5, 5.5),
                                    "current": (5.5, 5.5),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_7": {"prim_path": "/Table_6",
                                    "origin": (5.5, 9),
                                    "current": (7, 11),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_8": {"prim_path": "/Table_6",
                                    "origin": (9, 5.5),
                                    "current": (7, 15),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                        "table_9": {"prim_path": "/Table_6",
                                    "origin": (9, 9),
                                    "current": (9, 9),
                                    "BR": {"x": (-0.75, 0.75), "y": (-0.5, 0.5), "z": (0, 0)},
                                    "RD": {"Translate": {"x": (-0.5, 0.5), "y": (-0.5, 0.5), "z": (0, 0)}}},
                 }}
        self.active_map = None
        self.active_map_name = ""
        # TODO: check the default state and how to reset

    def randomize(self):
        for key, value in self.data[self.active_env]["prims"].items():
            self.data[self.active_env]["prims"][key]["current"] = ( value["origin"][0]+random.uniform(value["RD"]["Translate"]["x"][0], value["RD"]["Translate"]["x"][1]),
                                                                    value["origin"][1]+random.uniform(
                                                                    value["RD"]["Translate"]["y"][0], value["RD"]["Translate"]["y"][1]),
                                                                    value["origin"][2]+random.uniform(value["RD"]["Translate"]["z"][0], value["RD"]["Translate"]["z"][1]))
            print(key)
        return

    def generate_map(self, config):
        km = KabaniMap()
        km.generate_map(config)
        self.active_map = km
        self.active_map_name = "env-1"

    def randomize_config(self):
        choice = random.choice(
            list(self.data[self.active_env]["configs"].keys()))
        self.set_config(choice)
        return choice

    def get_block_ranges(self):
        return np.array([[
                        [item["BR"]["x"][0] + item["current"][0],
                            item["BR"]["x"][1] + item["current"][0]],
                        [item["BR"]["y"][0] + item["current"][1],
                            item["BR"]["y"][1] + item["current"][1]]
                        ] for item in self.data[self.active_env]["prims"].values()])
    
    def shrink(self, data, rows, cols):
        return data.reshape(rows, round(data.shape[0]/rows), cols, round(data.shape[1]/cols)).sum(axis=1).sum(axis=2)

    def convert_np_bit_map(self, np_bit_map, step):
        """ np_bit_map = self.shrink(np_bit_map, 100, 100)
        step = step*2 """
        return KabaniMap(np.array([[[round(i*step, 1), round(j*step, 1),   # x, y: 0, 1
                               0,                  # travel factor: 2
                               0,                  # g_cost: 3
                               0,                  # h_cost: 4
                               0,                  # f_cost: 5
                               0, 0,               # parent_x, parent_y: 6, 7
                               0, 0, 0,            # R, G, B: 8, 9, 10
                               ]
                              if np_bit_map[i][j] == 0 else
                              [round(i*step, 1), round(j*step, 1),   # x, y: 0, 1
                               1,                  # travel factor: 2
                               0,                  # g_cost: 3
                               0,                  # h_cost: 4
                               0,                  # f_cost: 5
                               0, 0,               # parent_x, parent_y: 6, 7
                               255, 255, 255,            # R, G, B: 8, 9, 10
                               ]
                              for i in range(np_bit_map.shape[1])] for j in range(np_bit_map.shape[0])]), step)

    def make_video(self, frames_array, fps, save_file):
        import cv2
        print(f"saving video to {save_file} ...")
        hieght = frames_array[0].shape[0]
        width = frames_array[0].shape[1]
        channel = frames_array[0].shape[2]
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        video = cv2.VideoWriter(save_file, fourcc, float(fps), (width, hieght))
        for frame in frames_array:
            video.write(frame[:, :, 2::-1])
        video.release()
        print("done saving video")

    def __str__(self) -> str:
        return self.active_map_name

